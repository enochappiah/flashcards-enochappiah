import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { AddDeckDialog } from "./deck/add-deck-dialog";
import { AddCardDialog } from "./card/add-card-dialog";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { SearchDeckDialog } from "./deck/search-deck-dialog";

const Sidebar = () => {
  const navigate = useNavigate();
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const { deckId } = useParams();
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);

  useEffect(() => {
    if (!deckId) {
      clearSelectedDeckId();
    } else {
      setSelectedDeckId(deckId);
    }
  }, [setSelectedDeckId, deckId]);

  const handleClickHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-2 p-4">
      <Button
        aria-label={"Home"}
        variant="ghost"
        size="sm"
        onClick={handleClickHome}
      >
        <HomeIcon className="w-5 h-5" />
      </Button>
      <SearchDeckDialog/>
      {!selectedDeckId && <AddDeckDialog />}
      {selectedDeckId && <AddCardDialog />}
    </div>
  );
};

export default Sidebar;
