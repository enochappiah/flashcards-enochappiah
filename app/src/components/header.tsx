import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-center gap-3 p-4 border-b border-stone-200">
      <Button variant={"link"}>Decks</Button>
      <Button variant={"link"} disabled={true}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
