import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

const Header = () => {
  const {deckId} = useParams();
  return (
    <div className="flex justify-center gap-3 p-4 border-b border-stone-200">
      <Button variant={"link"} disabled={!!deckId}>
        Decks
      </Button>
      <Button variant={"link"} disabled={!deckId}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
