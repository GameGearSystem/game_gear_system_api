import { Request, Response } from "express";
import { register as create, getByUuid as getGameByUuid, getAll, update, deleteGameByUuid} from "../services/game.service";
import { createTResult } from "../core/mappers/tresult.mappers";
import { GameEntityToDto, GamesEntityToDto } from "../core/mappers/game.mapper";
import { GameCreateDto, GameUpdateDto } from "../core/dto/game.dto";

export const getGames = async (req: Request, res: Response) => {
    try {
        const games = await getAll();
        res.status(200).json(createTResult(GamesEntityToDto(games)));
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const getGame = async (req: Request, res: Response) => {
    try {
        const game = await getGameByUuid(req.params.uuid);
        res.status(200).json(createTResult(GameEntityToDto(game)));
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const createGame = async (req: Request, res: Response) => {
    try {
        const game = req.body as GameCreateDto;
      
        const newGame = await create(game);

        res.status(201).json(createTResult(GameEntityToDto(newGame)));
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const updateGame = async (req: Request, res: Response) => {
    try {

        // Extraemos el uuid de los parámetros de la ruta
        const { uuid } = req.params;
        
        // Construimos el objeto GameUpdateDto con el uuid y los demás datos del cuerpo de la solicitud
        const game: GameUpdateDto = {
            uuid: uuid,
            name: req.body.name,
            description: req.body.description
        };

        const updatedGame = await update(game);
        res.status(200).json(createTResult(GameEntityToDto(updatedGame)));
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const deleteGame = async (req: Request, res: Response) => {
    try {
        await deleteGameByUuid(req.params.uuid);
        res.status(200).json(createTResult("Game deleted"));
    } catch (err) {
        res.status(500).json({ message: err });
    }
}