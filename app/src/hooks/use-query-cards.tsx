import { useToast } from "@/components/ui/use-toast";
import { fetchCards } from "@/lib/api";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { useParams } from "react-router-dom";

function useQueryCards() {
  const { toast } = useToast();
  const { deckId } = useParams();
  const cards = useStore((state) => state.cards);
  const setCards = useStore((state) => state.setCards);
  const clearCards = useStore((state) => state.clearCards);
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);

  useEffect(() => {
    if (!deckId) {
      clearSelectedDeckId();
    } else {
      setSelectedDeckId(deckId);
    }
  }, [setSelectedDeckId, deckId]);

  const loadCards = async () => {
    try {
      const fetchedCards = await fetchCards(selectedDeckId as string);
      setCards(fetchedCards);
    } catch (error) {
      clearCards();
      toast({
        variant: "destructive",
        title: "Failed to fetch cards",
        description:
          (error as Error).message ||
          "There was an error loading the cards. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (selectedDeckId) {
      loadCards();
    } else {
      clearSelectedDeckId();
      clearCards();
    }
  }, [selectedDeckId]);

  return { cards };
}

export default useQueryCards;
