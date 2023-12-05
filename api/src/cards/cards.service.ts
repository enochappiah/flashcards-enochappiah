import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Card } from "./card.entity";
import { CreateCardDto } from "./card-create.dto";
import { UpdateCardDto } from "./card-update.dto";
import { DecksService } from "src/decks/decks.service";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly decksService: DecksService,
  ) {}

  async create(createCardDto: CreateCardDto, deckId: string): Promise<Card> {
    const card = await this.cardRepository.create({
      ...createCardDto,
      deckId,
    });
    await this.decksService.incrementCardCounter(deckId);

    return this.cardRepository.save(card);
  }

  async findOneWithDeckID(deckId: string, id: string): Promise<Card | null> {
    return this.cardRepository.findOneBy({ deckId, id });
  }

  // async findOne(id: string): Promise<Card | null> {
  //   return this.cardRepository.findOneBy({ id });
  // }

  async update(
    deckId: string,
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<Card | null> {
    const card = await this.cardRepository.preload({
      deckId,
      id,
      ...updateCardDto,
    });
    if (!card) {
      return null;
    }
    if (updateCardDto.newFront) {
      card.front = updateCardDto.newFront;
    }
    if (updateCardDto.newBack) {
      card.back = updateCardDto.newBack;
    }
    return this.cardRepository.save(card);
  }

  async remove(deckId: string, id: string): Promise<Card | null> {
    const card = await this.findOneWithDeckID(deckId, id);
    if (!card) {
      return null;
    }
    await this.decksService.decrementCardCounter(deckId);
    return this.cardRepository.remove(card);
  }

  async findAll(
    deckId: string,
    limit: number,
    offset: number,
    search?: string,
  ): Promise<Card[]> {
    // const queryBuilder = this.cardRepository.createQueryBuilder("cards");

    // if (withDeckData) {
    //   queryBuilder.leftJoinAndSelect("cards.deck", "deck");
    // }

    // let hasWhereCondition = false;

    // if (deckId !== undefined) {
    //   if (hasWhereCondition) {
    //     queryBuilder.andWhere("cards.deckId = :deckId", { deckId });
    //   } else {
    //     queryBuilder.where("cards.deckId = :deckId", { deckId });
    //     hasWhereCondition = true;
    //   }
    // }

    // if (search !== undefined) {
    //   queryBuilder.andWhere("cards.front ILIKE :search", {
    //     search: `%${search}%`,
    //   });
    // queryBuilder.andWhere("cards.back ILIKE :search", {
    //   search: `%${search}%`,
    // });

    //   hasWhereCondition = true;
    // }

    // queryBuilder.limit(limit);
    // queryBuilder.offset(offset);
    // queryBuilder.orderBy("cards.createdAt", "DESC");

    // return await queryBuilder.getMany();
    // const queryBuilder = this.cardRepository.createQueryBuilder("cards");
    // let hasWhereCondition = false;
    const front = search ? ILike(`%${search}%`) : undefined;
    const back = search ? ILike(`%${search}%`) : undefined;
    //TODO how to search only front or back of card object
    const relations = []; //TODO ask relations front & back?

    const cards = await this.cardRepository.find({
      take: limit,
      skip: offset,
      where: [
        {
          deckId,
          front,
        },
        {
          deckId,
          back,
        },
      ],
      order: {
        createdAt: "DESC",
      },
      relations,
    });
    return cards;
  }
}
