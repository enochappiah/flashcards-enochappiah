import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { DecksService } from 'src/decks/decks.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateCardDto } from './card-create.dto';
import { CardResponseDto } from './card-response.dto';
import { CardsService } from './cards.service';
import { DeckId } from 'src/decorators/deck-id.decorator';
import { CardOwnershipGuard } from 'src/guards/card-owner.guard';
import { UpdateCardDto } from './card-update.dto';
import { FindCardsQueryDTO } from './find-cards-query.dto';
import { FindCardsResponseDTO } from './find-cards-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('/cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
  ) {}

  @Post()
  async create (
    @Body() createCardDto: CreateCardDto,
    @DeckId() deckId: string,
  ): Promise<CardResponseDto> {
    const card = await this.cardsService.create(createCardDto, deckId);
    //cacard.deck.numCards++;
    //TODO do i delete card.deck.userId here --> i think so
    delete card.deck.userId;
    return card;
  }

  @UseGuards(CardOwnershipGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CardResponseDto> {
    const card = await this.cardsService.findOne(id);
    if (!card) {
        throw new NotFoundException(`Card with ID ${id} not found`);
    }
    //TODO see line 23
    delete card.deck.userId;
    return card;
  }

  @UseGuards(CardOwnershipGuard)
  @Patch(":id")
  async update (
    @Param("id") id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardResponseDto> {
    const card = await this.cardsService.update(id, updateCardDto);
    //TODO see line 23
    delete card.deck.userId;
    return card;
  }

  @UseGuards(CardOwnershipGuard)
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<CardResponseDto> {
    const card = await this.cardsService.remove(id);
    //card.deck.numCards--;
    //TODO see line 23
    delete card.deck.userId;
    return card;
  }

  //TODO add ownership guard here?
  //TODO is withDeckData/withUserData needed in query & response dtos?
  @Get()
  async findAll(
    @DeckId() deckId: string,
    @Query() query: FindCardsQueryDTO,
  ): Promise<FindCardsResponseDTO> {
    const { limit, offset, search, withDeckData } = query;

    const cards = await this.cardsService.findAll(
        deckId,
        limit,
        offset,
        search,
        withDeckData,
    );

    return {
        limit,
        offset,
        search,
        withDeckData,
        data: cards.map((card) => {
          delete card.deck.userId; //TODO see line 23
          if (card.deck) {
            delete card.deck.user.password; //TODO see line 23
          }
          return card as CardResponseDto;
        }),
    };
  }

}
