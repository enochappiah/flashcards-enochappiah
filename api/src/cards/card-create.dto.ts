import { IsNotEmpty, IsString } from "class-validator";


export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: "Front card cannot be empty" })
  front: string;

  @IsString()
  @IsNotEmpty({ message: "Back card cannot be empty" })
  back: string;
}