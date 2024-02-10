import {Loader} from "lucide-react";
import {InfoSkeleton} from "./info";
import {ParticipantsSkeleton} from "./participants";
import {ToolbarSkeleton} from "./toolbar";

function CanvasLoading() {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
}

export default CanvasLoading;
