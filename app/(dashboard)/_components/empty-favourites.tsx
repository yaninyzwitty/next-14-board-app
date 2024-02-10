import Image from "next/image";
import React from "react";

type Props = {};

function EmptyFavourites({}: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src={"/empty-favorites.svg"}
        height={140}
        width={140}
        alt="empty"
      />
      <h2 className="text-2xl font-semibold mt-6"> No favourites boards</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Try adding a board to favourites
      </p>
    </div>
  );
}

export default EmptyFavourites;
