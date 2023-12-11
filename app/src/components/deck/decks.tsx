import Deck from "./deck";
import useQueryDecks from "@/hooks/use-query-decks";

const Decks = () => {
  const { decks } = useQueryDecks();

  return (
    <div className="">
      {decks.map((deck) => (
        <div key={deck.id}>
          <Deck deck={deck} />
        </div>
      ))}
    </div>
  );
};

export default Decks;
