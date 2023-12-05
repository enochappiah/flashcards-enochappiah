import { Module } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CardsController } from "./cards.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deck } from "src/decks/deck.entity";
import { Card } from "./card.entity";
import { DecksService } from "src/decks/decks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Card, Deck])],
  providers: [CardsService, DecksService],
  controllers: [CardsController],
})
export class CardsModule {}
