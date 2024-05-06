import { prismaClient } from "../core/config/database";
import { GameCreateDto, GameUpdateDto } from "../core/dto/game.dto";


export const getAll = async () => {
    try {
      const games = await prismaClient.game.findMany();
  
      return games;
    } catch (err) {
      throw new Error("Error getting games");
    }
}

export const getByUuid = async (uuid: string) => {
  try {
    const game = await prismaClient.game.findUnique({
      where: {
        uuid,
      },
    });

    return game;
  } catch (err) {
    throw new Error("Error getting game");
  }
}

export const register = async (game: GameCreateDto) => {
  try {
    const newGame = await prismaClient.game.create({
      data: {
        ...game,
      },
    });

    return newGame;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const update = async (game: GameUpdateDto) => {
  try {
    const updatedGame = await prismaClient.game.update({
      where: {
        uuid: game.uuid,
      },
      data: {
        ...game,
      },
    });
    return updatedGame;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export const deleteGameByUuid = async (uuid: string) => {
  try {
    await prismaClient.game.delete({
      where: {
        uuid,
      },
    });
  } catch (err) {
    throw new Error("Error deleting game");
  }
}