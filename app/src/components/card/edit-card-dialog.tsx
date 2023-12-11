import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import useMutationCards from "@/hooks/use-mutations-cards";
import { useStore } from "@/lib/store";

export function EditCardDialog({
  cardId,
  cardFront,
  cardBack,
  isOpen,
  onClose,
}: {
  cardId: string;
  cardFront: string;
  cardBack: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [front, setFront] = useState(cardFront);
  const [back, setBack] = useState(cardBack);
  const { changeCard } = useMutationCards();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!front || !back) {
      toast({
        variant: "destructive",
        title: "Sorry! Front and back cannot be empty! 🙁",
        description: `Please enter a title for both the front and back of your card.`,
      });
      handleCancel();
      onClose();
      return;
    }
    await changeCard(cardId, front, back);
    setFront(front);
    setBack(back);
    onClose();
  };

  const handleCancel = () => {
    setFront(front);
    setBack(back);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Card</DialogTitle>
          <DialogDescription>
            Edit the front or back of your card here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="front" className="text-right">
              Front
            </Label>
            <Input
              id="front"
              value={front}
              onChange={(e) => {
                setFront(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="back" className="text-right">
              Back
            </Label>
            <Input
              id="back"
              value={back}
              onChange={(e) => {
                setBack(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
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
}

export default EditCardDialog;
