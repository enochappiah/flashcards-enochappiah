import Deck from "./deck";
import useQueryDecks from "@/hooks/use-query-decks";

const Decks = () => {
  const { decks } = useQueryDecks();

  return (
    <div className="">
      {decks.map((deck) => (
        <Deck deck={deck} key={deck.id} />
      ))}
    </div>
  );
};

export default Decks;
