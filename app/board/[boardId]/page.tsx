import React from "react";
import Canvas from "./_components/canvas";
import Room from "@/components/room";
import CanvasLoading from "./_components/canvas-loading";

type Props = {
  params: {
    boardId: string;
  };
};

function BoardIdPage({params: {boardId}}: Props) {
  return (
    <Room roomId={boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
}

export default BoardIdPage;
