import { useState } from "react";
import { useToast } from "../ui/use-toast";

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
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { Textarea } from "../ui/textarea";
import { useStore } from "@/lib/store";
import useQueryDecks from "@/hooks/use-query-decks";

export const SearchDeckDialog = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const { addNewDeck } = useMutationDecks();
  const { loadDecks } = useQueryDecks();
  const user = useStore((state) => state.user);

  const handleSearch = async () => {
    if (!query) {
      toast({
        variant: "destructive",
        title: "Sorry! Title cannot be empty! 🙁",
        description: `Please enter the title for your deck.`,
      });
      return;
    }
    await loadDecks(query);
    setQuery("");
  };

  const handleCancel = () => {
    setQuery("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Search-Deck"} variant="ghost" size="sm">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Search for a Deck</DialogTitle>
          <DialogDescription>
            {user
              ? "Search for a deck by entering any keyword."
              : "Please login to search for a deck."}
          </DialogDescription>
        </DialogHeader> 
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="title"
                value={query}
                className="col-span-4"
                onChange={(e) => {
                  setQuery(e.target.value);
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
              <Button type="submit" onClick={handleSearch}>
                Search
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
