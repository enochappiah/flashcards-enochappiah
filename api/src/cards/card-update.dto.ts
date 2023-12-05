import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCardDto {
  @IsString()
  @IsOptional()
  newFront: string;

  @IsString()
  @IsOptional()
  newBack: string;
}
