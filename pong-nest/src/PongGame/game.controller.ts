import { Controller, Get } from "@nestjs/common";
import { GameService } from "./game.service";


@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}
  
  @Get('game')
    getGame(): string {
      return this.gameService.getGame();
    }
}