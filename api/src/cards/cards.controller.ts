import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { DecksService } from "src/decks/decks.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CreateCardDto } from "./card-create.dto";
import { CardResponseDto } from "./card-response.dto";
import { CardsService } from "./cards.service";
import { UpdateCardDto } from "./card-update.dto";
import { FindCardsQueryDTO } from "./find-cards-query.dto";
import { FindCardsResponseDTO } from "./find-cards-response.dto";

@UseGuards(JwtAuthGuard)
@Controller("decks/:deckId/cards")
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly decksService: DecksService,
  ) {}

  @Post()
  async create(
    @Body() createCardDto: CreateCardDto,
    @Param("deckId") deckId: string,
  ): Promise<CardResponseDto> {
    const deck = await this.decksService.findOne(deckId);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    return await this.cardsService.create(createCardDto, deckId);
  }

  @Get(":cardId")
  async findOne(
    @Param("deckId") deckId: string,
    @Param("cardId") cardId: string,
  ): Promise<CardResponseDto> {
    const deck = await this.decksService.findOne(deckId);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    const card = await this.cardsService.findOneWithDeckID(deckId, cardId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    return card;
  }

  @Patch(":cardId")
  async update(
    @Param("deckId") deckId: string,
    @Param("cardId") cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardResponseDto> {
    const deck = await this.decksService.findOne(deckId);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    const card = await this.cardsService.update(deckId, cardId, updateCardDto);
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    return card;
  }

  @Delete(":cardId")
  async remove(
    @Param("deckId") deckId: string,
    @Param("cardId") cardId: string,
  ): Promise<CardResponseDto> {
    const deck = await this.decksService.findOne(deckId);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    const card = await this.cardsService.remove(deckId, cardId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    return card;
  }

  @Get()
  async findAll(
    @Param("deckId") deckId: string,
    @Query() query: FindCardsQueryDTO,
  ): Promise<FindCardsResponseDTO> {
    const deck = await this.decksService.findOne(deckId);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    const { limit, offset, search } = query;
    const cards = await this.cardsService.findAll(
      deckId,
      limit,
      offset,
      search,
    );

    return {
      limit,
      offset,
      search,
      data: cards.map((card) => {
        return card;
      }),
    };
  }
}
