"use client";
import {Skeleton} from "@/components/ui/skeleton";
import {useOthers} from "@/liveblocks.config";
import {useSelf} from "@/liveblocks.config";
import {UserAvatar} from "./user-avatar";
import {connectionIdToColor} from "@/lib/utils";
function Participants() {
  const users = useOthers();

  const currentUser = useSelf();

  const MAX_SHOW_USERS = 2;
  const hasMoreUsers = users.length > MAX_SHOW_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOW_USERS).map(({connectionId, info}) => {
          return (
            <UserAvatar
              key={connectionId}
              borderColor={connectionIdToColor(connectionId)}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}

        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            borderColor={connectionIdToColor(currentUser.connectionId)}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOW_USERS} more`}
            fallback={`+${users.length - MAX_SHOW_USERS}`}
          />
        )}
      </div>
    </div>
  );
}

export default Participants;

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
}
