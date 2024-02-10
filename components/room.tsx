"use client";
import {ReactNode} from "react";
import {ClientSideSuspense} from "@liveblocks/react";

import {RoomProvider} from "@/liveblocks.config";
import {LiveMap, LiveList, LiveObject} from "@liveblocks/client";
import {Layer} from "@/types/canvas";

export default function Room({
  children,
  roomId,
  fallback,
}: {
  children: ReactNode;
  fallback: NonNullable<ReactNode> | null;
  roomId: string;
}) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
