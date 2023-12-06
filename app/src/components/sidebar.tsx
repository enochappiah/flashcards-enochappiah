import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { AddDeckDialog } from "./deck/add-deck-dialog";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Button aria-label={"Home"} variant="ghost" size="sm">
        <HomeIcon className="w-5 h-5" />
      </Button>
      <Button aria-label={"Search"} variant="ghost" size="sm">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>
      <AddDeckDialog />
    </div>
  );
};

export default Sidebar;
