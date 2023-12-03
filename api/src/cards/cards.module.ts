import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from 'src/decks/deck.entity';
import { Card } from './card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Deck])],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}
