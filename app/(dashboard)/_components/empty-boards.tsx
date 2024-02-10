"use client";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useOrganization} from "@clerk/nextjs";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

type Props = {};

function EmptyBoards({}: Props) {
  const {organization} = useOrganization();
  const router = useRouter();

  const {mutate, pending} = useApiMutation(api.board.create);
  const onClick = () => {
    if (!organization) return;
    mutate({title: "Untitled", orgId: organization?.id})
      .then((id) => {
        // redirect to board/id
        router.push(`/board/${id}`);
        toast.success("Board created");
      })
      .catch(() => toast.error("Failed to create Board!"));
  };
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src={"/note.svg"} height={110} width={110} alt="empty" />
      <h2 className="text-2xl font-semibold mt-6"> Create your first board</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size={"lg"} onClick={onClick} disabled={pending}>
          Create Board
        </Button>
      </div>
    </div>
  );
}

export default EmptyBoards;
