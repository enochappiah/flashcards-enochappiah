import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMutationCards from "@/hooks/use-mutations-cards";
import { EditCardDialog } from "./edit-card-dialog";
import { Fragment, useState } from "react";

const CardActions = ({
  cardId,
  cardFront,
  cardBack,
  isFlipped,
}: {
  cardId: string;
  cardFront: string;
  cardBack: string;
  isFlipped: boolean;
}) => {
  const { eliminateCard } = useMutationCards();
  const [isEditCardDialogOpen, setCardEditDialogOpen] = useState(false);

  const openCardEditDialog = () => {
    setCardEditDialogOpen(true);
  };

  const closeCardEditDialog = () => {
    setCardEditDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsVerticalIcon
              className="w-5 h-5"
              color={`${isFlipped ? "white" : "black"}`}
            />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={openCardEditDialog}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => eliminateCard(cardId)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Fragment>
        {isEditCardDialogOpen && (
          <EditCardDialog
            cardId={cardId}
            cardFront={cardFront}
            cardBack={cardBack}
            isOpen={isEditCardDialogOpen}
            onClose={closeCardEditDialog}
          />
        )}
      </Fragment>
    </>
  );
};

export default CardActions;
