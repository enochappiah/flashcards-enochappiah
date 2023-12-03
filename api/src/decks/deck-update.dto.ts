import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDeckDto {
  @IsString()
  @IsNotEmpty({ message: "Title cannot be empty" })
  newTitle: string;

  @IsOptional()
  @IsString()
  image?: string;
}
