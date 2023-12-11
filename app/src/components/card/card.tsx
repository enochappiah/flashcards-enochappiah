import type { Card } from "@/lib/types";
import CardActions from "./card-actions";
import { useState } from "react";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const Card = ({ card }: { card: Card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="border-b">
      <div className="relative w-3/4 h-48 mx-auto mt-5 bg-gray-200 border rounded shadow-lg sm:w-72 md:w-96 sm:h-56 md:h-64 mb-7">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-white rounded p-4 ${
            isFlipped ? "hidden" : ""
          } `}
        >
          <CardActions
            cardId={card.id}
            cardFront={card.front}
            cardBack={card.back}
            isFlipped={isFlipped}
          />
          <div className="justify-center text-center text-md sm:text-lg">
            <div className="p-4 sm:p-5 md:p-7 text-center"></div>
            {card.front}
          </div>
          <div className="absolute bottom-0 right-0 p-4">
            <div className="flex mb-4">
              <Button variant="ghost" size="sm" onClick={handleClick}>
                <SymbolIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full bg-black rounded p-4  ${
            isFlipped ? "" : "hidden"
          }`}
        >
          <CardActions
            cardId={card.id}
            cardFront={card.front}
            cardBack={card.back}
            isFlipped={isFlipped}
          />
          <div className="justify-center text-center text-md sm:text-lg text-white">
            <div className="p-4 sm:p-5 md:p-7 text-center"></div>
            {card.back}
          </div>
          <div className="absolute bottom-0 right-0 p-4">
            <div className="flex mb-4">
              <Button variant="ghost" size="sm" onClick={handleClick}>
                <SymbolIcon className="w-5 h-5" color="white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
