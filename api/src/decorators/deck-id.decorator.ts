import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export interface RequestWithDeck extends Request {
  deck: {
    deckId: string;
    deckTitle: string;
  };
}

export const DeckId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); // Switching to HTTP context and getting the req object
    const deck = (request as RequestWithDeck).deck;
    return deck.deckId;
  },
);