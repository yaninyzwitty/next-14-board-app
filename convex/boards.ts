import { v } from 'convex/values';
import { query } from './_generated/server'; 
import { getAllOrThrow } from "convex-helpers/server/relationships"

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favourites: v.optional(v.string())
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error('Unauthorized')
        };
        if (args.favourites) {
            const favoritedBoards = await ctx.db
              .query("userFavourites")
              .withIndex("by_user_org", (q) => 
                q
                  .eq("userId", identity.subject)
                  .eq("orgId", args.orgId)
              )
              .order("desc")
              .collect();
      
            const ids = favoritedBoards.map((b) => b.boardId);
      
            const boards = await getAllOrThrow(ctx.db, ids);
      
            return boards.map((board) => ({
              ...board,
              isFavorite: true,
            }));
          }


        const title = args.search as string;
        let boards = [];

        
        

        if(title) {
            // todo--query with search idx
            const boards = await ctx.db.query('boards').withSearchIndex('search_title', q => q.search('title', title).eq('orgId', args.orgId)).collect()
            return boards;

        


        } else {


         boards = await ctx.db.query('boards').withIndex('by_org', (q) => q.eq('orgId', args.orgId )).order('desc').collect();


        const boardsWithFavRelations = boards.map((board) => {
            return ctx.db.query('userFavourites').withIndex('by_user_board', (q) => q.eq('userId' , identity.subject).eq('boardId', board._id)).unique().then((favourite) => {
                return {
                    ...board,
                    isFavourited: !!favourite
                }
            })
        
        });


        const boardsWithFavBoolean = Promise.all(boardsWithFavRelations);

        return boardsWithFavBoolean;
        
    }
}


})