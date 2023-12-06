import Header from "./header";
import Decks from "./deck/decks";
import { useStore } from "@/lib/store";

const Feed = () => {
  const user = useStore((state) => state.user);
  return (
    <div className="flex flex-col w-full min-h-screen border-x border-stone-200 md:max-w-lg">
      <Header />
      {!user && (
        <div className="flex items-center justify-center h-screen">
          Please login to view your cards or register to use this app
        </div>
      )}
      {user && <Decks />}
    </div>
  );
};

export default Feed;
