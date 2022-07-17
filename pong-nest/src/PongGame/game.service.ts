import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService {
  getGame(): string {
    return "Pong Game Hello";
  }
}