import { createCard, deleteCard, editCard } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function useMutationCards() {
  const { toast } = useToast();
  const { deckId } = useParams();
  const addCard = useStore((state) => state.addCard);
  const removeCard = useStore((state) => state.removeCard);
  const editCardText = useStore((state) => state.editCardText);
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

  const addNewCard = async (front: string, back: string) => {
    try {
      const newCard = await createCard(selectedDeckId as string, front, back);
      addCard(newCard);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the card",
        description:
          (error as Error).message ||
          "There was an error creating the card. Please try again later.",
      });
    }
  };

  const eliminateCard = async (cardId: string) => {
    try {
      await deleteCard(selectedDeckId as string, cardId);
      removeCard(selectedDeckId as string, cardId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the card",
        description:
          (error as Error).message ||
          "There was an error deleting the card. Please try again later.",
      });
    }
  };

  const changeCard = async (
    cardId: string,
    newFront: string,
    newBack: string,
  ) => {
    try {
      await editCard(selectedDeckId as string, cardId, newFront, newBack);
      editCardText(selectedDeckId as string, cardId, newFront, newBack);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit the card",
        description:
          (error as Error).message ||
          "There was an error editing the card. Please try again later.",
      });
    }
  };
  return { addNewCard, eliminateCard, changeCard };
}

export default useMutationCards;
