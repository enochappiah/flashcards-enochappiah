import { useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { toast } from "./ui/use-toast";
import { useStore } from "@/lib/store";

export const EditDeckDialog = ({
  deckId,
  deckTitle,
  isOpen,
  onClose,
}: {
  deckId: string;
  deckTitle: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState(deckTitle);
  const { editTitle } = useMutationDecks();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Sorry! Title cannot be empty! 🙁",
        description: `Please enter the title for your deck.`,
      });
      handleCancel();
      onClose();
      return;
    }

    await editTitle(deckId, title);
    setTitle(title);
  };

  const handleCancel = () => {
    onClose();
    setTitle(deckTitle);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button aria-label={"Edit a Deck"} variant="ghost"></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Provide the content of your post here.
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                className="col-span-3"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
