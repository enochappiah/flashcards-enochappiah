import { CardResponseDto } from "./card-response.dto"; //DTO vs dto

export class FindCardsResponseDTO {
  limit?: number;
  offset?: number;
  search?: string;
  data: CardResponseDto[];
}
