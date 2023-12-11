import { Link } from "react-router-dom";
import DeckActions from "./deck-actions";
import { DecksData } from "@/lib/types";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useStore } from "@/lib/store";
import { SyntheticEvent, useEffect } from "react";
import { useParams } from "react-router-dom"

const Deck = ({ deck }: { deck: DecksData }) => {
  const { deckId } = useParams();
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);  

    useEffect(() => {
    if (!deckId) {
      clearSelectedDeckId();
        
    } else {
     setSelectedDeckId(deckId);
    }
  }, [setSelectedDeckId, deckId]);

  const showCards = (event: SyntheticEvent) => {
    event.preventDefault();
    if (selectedDeckId === deck.id) {
       clearSelectedDeckId();
     } else {
    setSelectedDeckId(deck.id as string);

    }
  };

  // useEffect(() => {
  //   clearSelectedDeckId();
  // }, [selectedDeckId]);

 

  return (
    <div className="border-b">
      <div className="relative w-3/4 h-48 mx-auto mt-5 bg-gray-200 border rounded shadow-lg sm:w-72 md:w-96 sm:h-56 md:h-64 mb-7">
        <div className="absolute top-0 left-0 w-full h-full transform translate-x-2 translate-y-2 bg-white rounded shadow-md">
          <div className="p-4 sm:p-5 md:p-6"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full transform translate-x-1 translate-y-1 bg-white rounded shadow-md"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded shadow-md">
          <div className="flex justify-between">
            <div className="p-4 sm:p-5 md:p-6">
              <p className="font-semibold text-md sm:text-lg">{deck.title}</p>
              <p className="mt-1 sm:mt-2">
                {deck.numCards !== undefined ? deck.numCards : 0} cards
              </p>
            </div>
            <div className="p-4">
              <DeckActions deckId={deck.id} deckTitle={deck.title} />
            </div>
            <div className="absolute bottom-0 right-0 p-4">
              <div className="flex mb-4">
                <Link to={`decks/${deck.id}/cards`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {showCards}}
                  >
                    <OpenInNewWindowIcon className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
