import { useState } from "react";
import { useToast } from "./ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { Textarea } from "./ui/textarea";
import { useStore } from "@/lib/store";

export const AddDeckDialog = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const { addNewDeck } = useMutationDecks();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Sorry! Title cannot be empty! 🙁",
        description: `Please enter the title for your deck.`,
      });
      return;
    }
    await addNewDeck(title);
    setTitle("");
  };

  const handleCancel = () => {
    setTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a Deck"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Deck</DialogTitle>
          <DialogDescription>
            {user
              ? "Give a title to your deck here."
              : "Please login to make a deck."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="title"
                value={title}
                className="col-span-4"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
