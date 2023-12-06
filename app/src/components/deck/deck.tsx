import DeckActions from "./deck-actions";
import { DecksData } from "@/lib/types";

const Deck = ({ deck }: { deck: DecksData }) => {
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
                {deck.numberOfCards ? deck.numberOfCards : 0} cards
              </p>
            </div>
            <div className="p-4">
              <DeckActions deckId={deck.id} deckTitle={deck.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
