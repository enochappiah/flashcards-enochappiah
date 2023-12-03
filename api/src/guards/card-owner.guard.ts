import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RequestWithUser } from "src/decorators/user-id.decorator";
import { CardsService } from "src/cards/cards.service";
import { RequestWithDeck } from "src/decorators/deck-id.decorator";

@Injectable()
export class CardOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cardsService: CardsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Get the deck id from the request object
    const deck = (request as RequestWithDeck).deck;
    const deckId = deck.deckId;
    // The JWT strategy will throw an error if it fails to validate the token

    // Get the card id from the request params
    const cardId = request.params.id;

    // If cardId is not provided
    if (!cardId) {
      throw new BadRequestException("Invalid or missing card ID");
    }

    const card = await this.cardsService.findOne(cardId);

    // If post does not exist
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    // Check if the post belongs to the user
    return card.deckId == deckId;
  }
}
