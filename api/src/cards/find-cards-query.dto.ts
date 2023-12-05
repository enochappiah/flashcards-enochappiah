import {
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  IsString,
  IsBoolean,
  Max,
} from "class-validator";

export class FindCardsQueryDTO {
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit: number = 10;

  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @IsString()
  @IsOptional()
  search: string;

  // @IsInt()
  // @IsPositive()
  // @Min(1)
  // @IsOptional()
  // deckId: string;
}
