import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { CreateDeckDto } from "./deck-create.dto";
import { UpdateDeckDto } from "./deck-update.dto";

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
  ) {}

  async incrementCardCounter(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    deck.numCards += 1;
    await this.deckRepository.save(deck);
    return deck;
  }

  async decrementCardCounter(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    if (deck.numCards === 0) {
      return null;
    }
    deck.numCards -= 1;
    await this.deckRepository.save(deck);
    return deck;
  }

  async create(createDeckDto: CreateDeckDto, userId: number): Promise<Deck> {
    const deck = await this.deckRepository.create({
      ...createDeckDto,
      userId,
    });
    return this.deckRepository.save(deck);
  }

  async findOne(id: string, withUserData?: boolean): Promise<Deck | null> {
    const relations = [];
    if (withUserData) {
      relations.push("user");
    }
    return this.deckRepository.findOne({
      where: { id },
      relations,
    });
  }

  async update(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck | null> {
    const deck = await this.deckRepository.preload({ id, ...updateDeckDto });
    if (!deck) {
      return null;
    }
    deck.title = updateDeckDto.newTitle;
    return this.deckRepository.save(deck);
  }

  async remove(id: string): Promise<Deck | null> {
    const deck = await this.findOne(id);
    if (!deck) {
      return null;
    }
    return this.deckRepository.remove(deck);
  }

  async findAll(
    userId: number,
    limit: number,
    offset: number,
    search?: string,
    withUserData?: boolean,
  ): Promise<Deck[]> {
    const queryBuilder = this.deckRepository.createQueryBuilder("decks");

    if (withUserData) {
      queryBuilder.leftJoinAndSelect("decks.user", "user");
    }
    let hasWhereCondition = false;

    if (userId !== undefined) {
      if (hasWhereCondition) {
        queryBuilder.andWhere("decks.userId = :userId", { userId });
      } else {
        queryBuilder.where("decks.userId = :userId", { userId });
        hasWhereCondition = true;
      }
    }
    if (search !== undefined) {
      queryBuilder.andWhere("decks.title ILIKE :search", {
        search: `%${search}%`,
      });
      hasWhereCondition = true;
    }

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    queryBuilder.orderBy("decks.createdAt", "DESC");

    return await queryBuilder.getMany();
  }
}
