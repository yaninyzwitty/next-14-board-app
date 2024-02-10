import React from "react";
import NewButton from "./new-button";
import List from "./list";

function Sidebar() {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 text-white h-full w-[60px] flex flex-col p-3 gap-y-4">
      <List />
      <NewButton />
    </aside>
  );
}

export default Sidebar;
