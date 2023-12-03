import { Module } from "@nestjs/common";
import { DecksService } from "./decks.service";
import { DecksController } from "./decks.controller";
import { TypeOrmModule } from "@nestjs/typeorm"; // <-- add this line
import { Deck } from "./deck.entity"; // <-- add this line
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Deck, User])],
  providers: [DecksService, UserService],
  controllers: [DecksController],
})
export class DecksModule {}
