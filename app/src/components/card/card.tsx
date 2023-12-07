import type { Card } from "@/lib/types";

const Card = ({ card }: { card: Card }) => {
  return (
    <div className="border-b">
      <div className="absolute top-0 left-0 w-full h-full bg-black rounded shadow-md border-b border-stone-500 hidden"></div>
      <div className="relative w-3/4 h-48 mx-auto mt-5 bg-gray-200 border rounded shadow-lg sm:w-72 md:w-96 sm:h-56 md:h-64 mb-7">
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded shadow-md border-b border-stone-500">
          <div className="flex justify-between">
            <p className="flex p-4 items-center justify-center h-screen mt-1 sm:mt-2">{card.front}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
