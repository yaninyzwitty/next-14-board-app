import Image from "next/image";
import React from "react";

type Props = {};

function EmptySearch({}: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src={"/empty-search.svg"} height={140} width={140} alt="empty" />
      <h2 className="text-2xl font-semibold mt-6"> No results found</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Try searching for something else
      </p>
    </div>
  );
}

export default EmptySearch;
