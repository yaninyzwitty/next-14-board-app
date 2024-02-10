"use client";

import {Skeleton} from "@/components/ui/skeleton";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {useQuery} from "convex/react";
import Image from "next/image";
import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import React from "react";
import Actions from "@/components/actions";
import Link from "next/link";
import Hint from "@/components/hint";
import {useRenameModal} from "@/store/use-rename-modal";
import {Menu} from "lucide-react";

type Props = {
  boardId: string;
};

const font = Poppins({subsets: ["latin"], weight: ["600"]});

function Info({boardId}: Props) {
  const {onOpen} = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button className="px-2" variant={"board"} asChild>
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="Board logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint side="bottom" sideOffset={10} label="Edit the title">
        <Button
          variant={"board"}
          className="text-base font-normal px-2"
          onClick={() => onOpen(data?._id, data.title)}
        >
          {data?.title}
        </Button>
      </Hint>
      <TabSeparator />

      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
}

export default Info;

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md w-[300px] px-1.5 h-12 flex items-center shadow-md">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
}

export const TabSeparator = () => (
  <div className=" text-neutral-300 px-1.5 ">|</div>
);
