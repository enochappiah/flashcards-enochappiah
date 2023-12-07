import { Button } from "@/components/ui/button";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
//import DeckActions from "./deck-actions";
import { SyntheticEvent} from "react";
import { useStore } from "@/lib/store";


const DeckFooter = ({
    deckId,

}: {
    deckId: string;
}) => {
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);

  const showCards = (event: SyntheticEvent) => {
    event.preventDefault();
    if(selectedDeckId === deckId) {
        clearSelectedDeckId();
    } else {
        setSelectedDeckId(deckId);
    }
  };

  return (
    <div className="flex mb-4">
        <Button variant="ghost"size="sm" onClick={showCards}>
            <OpenInNewWindowIcon className="w-5 h-5" />
        </Button>
    </div>
  );
};

export default DeckFooter;