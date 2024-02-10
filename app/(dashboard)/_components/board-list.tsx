"use client";

import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavourites from "./empty-favourites";
import EmptyBoards from "./empty-boards";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";

type Props = {
  organizationId: string;
  query: {
    search?: string;
    favourites?: string;
  };
};

function BoardList({organizationId, query}: Props) {
  const data = useQuery(api.boards.get, {
    orgId: organizationId,
    search: query.search,
    favourites: query.favourites,
  });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favourites ? "Favourites Boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8 gap-5 pb-10">
          <NewBoardButton orgId={organizationId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }
  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favourites) {
    return <EmptyFavourites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }
  return (
    <div>
      <h2 className="text-3xl">
        {query.favourites ? "Favourites Boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8 gap-5 pb-10">
        <NewBoardButton orgId={organizationId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            // @ts-ignore
            isFavourite={board.isFavourited}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardList;
