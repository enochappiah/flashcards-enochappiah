import { DeckResponseDto } from "./deck-response.dto"; //DTO vs dto

export class FindDecksResponseDTO {
  limit?: number;
  offset?: number;
  search?: string;
  withUserData?: boolean;
  data: DeckResponseDto[]; //DTO vs dto
}
