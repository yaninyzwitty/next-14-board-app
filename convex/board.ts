import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
  ];


export const create = mutation({
    args: { orgId: v.string(), title: v.string()},
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error("Unauthorized");
        
        };


        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        })
        return board;


        
    },
})


export const remove = mutation({
    args: { id: v.id('boards') },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error('Unauthorized')
        }

        // delete favourite relation too
        const userId = identity.subject;
        const existingFav = await ctx.db.query('userFavourites').withIndex('by_user_board', (q) => q.eq('userId' , userId).eq('boardId', args.id)).unique();

        if(existingFav) {
            await ctx.db.delete(existingFav._id);
        
        }


        await ctx.db.delete(args.id);
        
    },
})


export const update = mutation({
    args: { id: v.id('boards'), title: v.string() },
    async handler(ctx, args) {
        const title = args.title.trim();
        if(!title) {
            throw new Error('Title required');
        }

        if(title.length > 60) {
            throw new Error('Title cannot be long than 60 characters');
        }
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error('Unauthorized');

        };


        const board = await ctx.db.patch(args.id, {
            title: args.title
        });

        return board;



    },
})


export const favourite = mutation({
    args: { id: v.id('boards'), orgId: v.string() },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error('Unauthorized');

        
        };
        const board = await ctx.db.get(args.id)
        if(!board) {
            throw new Error('Board not found');
        
        };
        const userId = identity.subject;

        const existingFav = await ctx.db.query('userFavourites').withIndex('by_user_board_org', (q) => q.eq('userId' , userId).eq('boardId', board._id).eq('orgId', args.orgId)).unique();


        if(existingFav) {
            throw new Error('Board already favourited');
        }
        await ctx.db.insert('userFavourites', {
            orgId: args.orgId,
            userId,
            boardId: board._id,
        });

        return board;
        
    },
})
export const unFavourite = mutation({
    args: { id: v.id('boards') },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error('Unauthorized');

        
        };
        const board = await ctx.db.get(args.id)
        if(!board) {
            throw new Error('Board not found');
        
        };
        const userId = identity.subject;

        const existingFav = await ctx.db.query('userFavourites').withIndex('by_user_board', (q) => q.eq('userId' , userId).eq('boardId', board._id)).unique();


        if(!existingFav) {
            throw new Error('Favourited board not found');
        }

    
        await ctx.db.delete(existingFav._id);

        return board;
        
    },
})



export const get = query({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
      const board = ctx.db.get(args.id);
  
      return board;
    },
  });