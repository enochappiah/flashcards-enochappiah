import Aside from "./aside";
import Sidebar from "./sidebar";
import { useStore } from "@/lib/store";
import { useParams } from "react-router-dom";
import Cards from "./card/cards";
import Header from "./header";
import { useEffect } from "react";

const CardView = () => {
  const { deckId } = useParams();
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  const user = useStore((state) => state.user);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);
  

    useEffect(() => {
    if (!deckId) {
      clearSelectedDeckId();
        
    } else {
     setSelectedDeckId(deckId);
    }
  }, [setSelectedDeckId, deckId]);
  return (
    <>
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen border-x  md:max-w-lg">
        <Header></Header>
        {!user && (
          <div className="flex items-center justify-center h-screen">
            Please login to view your cards or register to use this app
          </div>
        )}
        {selectedDeckId && <Cards />}
      </div>
      <Aside />
    </>
  );
};

export default CardView;
