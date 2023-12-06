import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { EditDeckDialog } from "./edit-deck-dialog";
import { Fragment, useState } from "react";

const DeckActions = ({
  deckId,
  deckTitle,
}: {
  deckId: string;
  deckTitle: string;
  username?: string;
}) => {
  const { deleteDeckById } = useMutationDecks();
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsVerticalIcon className="w-5 h-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={openEditDialog}>Edit</DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500"
            onClick={() => deleteDeckById(deckId)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Fragment>
        {isEditDialogOpen && (
          <EditDeckDialog
            deckId={deckId}
            deckTitle={deckTitle}
            isOpen={isEditDialogOpen}
            onClose={closeEditDialog}
          />
        )}
      </Fragment>
    </>
  );
};

export default DeckActions;
