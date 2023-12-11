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
import { Textarea } from "../ui/textarea";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import useMutationCards from "@/hooks/use-mutations-cards";

export const AddCardDialog = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { addNewCard } = useMutationCards();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!front || !back) {
      toast({
        variant: "destructive",
        title: "Sorry! Front and back cannot be empty! 🙁",
        description: `Please enter a title for both the front and back of your card.`,
      });
      return;
    }
    await addNewCard(front, back);
    setFront("");
    setBack("");
  };

  const handleCancel = () => {
    setFront("");
    setBack("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a Card"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            {user
              ? "Write on the front and back of your card!"
              : "Please login to make a deck & card."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="front"
                value={front}
                className="col-span-4"
                onChange={(e) => {
                  setFront(e.target.value);
                }}
              />
              <Textarea
                id="back"
                value={back}
                className="col-span-4"
                onChange={(e) => {
                  setBack(e.target.value);
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
