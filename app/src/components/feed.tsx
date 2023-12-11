import Header from "./header";
import Decks from "./deck/decks";
import { useStore } from "@/lib/store";
import Cards from "./card/cards";
import { useParams } from "react-router-dom";

const Feed = () => {
  const user = useStore((state) => state.user);
  const { deckId } = useParams();
  return (
    <div className="flex flex-col w-full min-h-screen border-x border-stone-200 md:max-w-lg">
      <Header />
      {!user && (
        <div className="flex items-center justify-center h-screen">
          Please login to view your cards or register to use this app
        </div>
      )}
      {user && <Decks />}
      {deckId && <Cards />}
    </div>
  );
};

export default Feed;
