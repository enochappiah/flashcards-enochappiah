import { UserResponseDTO } from "src/user/user-response.dto";

export class DeckResponseDto {
  //DTO vs dto
  id: string;
  title: string;
  image?: string;
  numCards: number;
  user?: UserResponseDTO; //DTO vs dto
}
