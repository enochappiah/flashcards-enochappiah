import { createCard, deleteCard } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationCards() {
  const { toast } = useToast();
  const addCard = useStore((state) => state.addCard);
  const removeCard = useStore((state) => state.removeCard);
  const editCard = useStore((state) => state.editCard);
  const selectedDeckId = useStore((state) => state.selectedDeckId);

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
      editCard(selectedDeckId as string, cardId, newFront, newBack);
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
