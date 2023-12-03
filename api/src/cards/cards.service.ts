import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './card-create.dto';
import { UpdateCardDto } from './card-update.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto, deckId: string): Promise<Card> {
    const card = await this.cardRepository.create({
        ...createCardDto,
        deckId,
    });
    card.deck.numCards++;
    return this.cardRepository.save(card);
  }

  async findOne(id: string): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  async update(id:string, updateCardDto: UpdateCardDto): Promise<Card | null> {
    const card = await this.cardRepository.preload({ id, ...updateCardDto });
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

  async remove(id: string): Promise<Card | null> {
    const card = await this.findOne(id);
    if (!card) {
        return null;
    }
    card.deck.numCards--;
    return this.cardRepository.remove(card);
  }

  async findAll(
    deckId: string,
    limit:number,
    offset:number,
    search?: string,
    withDeckData?: boolean,
  ): Promise<Card[]> {
    const queryBuilder = this.cardRepository.createQueryBuilder("cards");

    if (withDeckData) {
        queryBuilder.leftJoinAndSelect("cards.deck", "deck");
    }
    
    let hasWhereCondition = false;

    if (deckId !== undefined) {
        if (hasWhereCondition) {
          queryBuilder.andWhere("cards.deckId = :deckId", { deckId });
        } else {
          queryBuilder.where("cards.deckId = :deckId", { deckId });
          hasWhereCondition = true;
        }
    }

    if (search !== undefined) {
        queryBuilder.andWhere("cards.front ILIKE :search", {
          search: `%${search}%`,
        });
        queryBuilder.andWhere("cards.back ILIKE :search", {
            search: `%${search}%`,
          });

        hasWhereCondition = true;
    }

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    queryBuilder.orderBy("cards.createdAt", "DESC");

    return await queryBuilder.getMany();
  }
}
