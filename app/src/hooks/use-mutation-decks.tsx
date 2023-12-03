import { useToast } from "@/components/ui/use-toast";
import { createDeck, deleteDeck, editDeck } from "@/lib/api";
import { useStore } from "@/lib/store";

function useMutationDecks() {
  const { toast } = useToast();
  const removeDeck = useStore((state) => state.removeDeck);
  const addDeck = useStore((state) => state.addDeck);
  const editDeckTitle = useStore((state) => state.editDeckTitle);

  const deleteDeckById = async (deckId: string) => {
    try {
      await deleteDeck(deckId);
      removeDeck(deckId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  const addNewDeck = async (title: string, image?: string) => {
    try {
      const newDeck = await createDeck(title, image);
      addDeck(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the deck",
        description:
          (error as Error).message ||
          "There was an error creating the deck. Please try again later.",
      });
    }
  };

  const editTitle = async (id: string, newTitle: string) => {
    try {
      await editDeck(id, newTitle);
      editDeckTitle(id, newTitle);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit the deck",
        description:
          (error as Error).message ||
          "There was an error editing the deck. Please try again later.",
      });
    }
  };

  return { deleteDeckById, addNewDeck, editTitle };
}

export default useMutationDecks;
