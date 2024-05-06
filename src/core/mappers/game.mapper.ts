import { Game } from "@prisma/client";
import { GameDto } from "../dto/game.dto";

export const GameEntityToDto = (game: Game): GameDto => {
    return {
        uuid: game.uuid,
        name: game.name,
        description: game.description,
    };
}  

export const GamesEntityToDto = (games: Game[]): GameDto[] => {
    return games.map(game => GameEntityToDto(game));
}  