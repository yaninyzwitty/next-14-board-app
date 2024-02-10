"use client";

import {useOrganizationList} from "@clerk/nextjs";
import Item from "./item";

function List() {
  const {userMemberships} = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships?.data?.length) return;

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((membership) => (
        <Item
          key={membership.organization.id}
          id={membership.organization.id}
          imageUrl={membership.organization.imageUrl}
          name={membership.organization.name}
        />
      ))}
    </ul>
  );
}

export default List;
