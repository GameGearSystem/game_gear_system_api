import { Request, Response } from "express";
import { register as create, getByUuid as getDeviceByUuid, getAll, update, deleteDeviceByUuid} from "../services/device.service";
import { createTResult } from "../core/mappers/tresult.mappers";
import { DeviceEntityToDto, DevicesEntityToDto } from "../core/mappers/device.mapper";
import { DeviceCreateDto, DeviceUpdateDto } from "../core/dto/device.dto";

export const getDevices = async (req: Request, res: Response) => {
    try {
        const devices = await getAll();
        res.status(200).json(createTResult(DevicesEntityToDto(devices)));
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const getDevice = async (req: Request, res: Response) => {
    try {
        const device = await getDeviceByUuid(req.params.uuid);
        res.status(200).json(createTResult(DeviceEntityToDto(device)));
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const createDevice = async (req: Request, res: Response) => {
    try {
        const device = req.body as DeviceCreateDto;
      
        const newDevice = await create(device);

        res.status(201).json(createTResult(DeviceEntityToDto(newDevice)));
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const updateDevice = async (req: Request, res: Response) => {
    try {

        // Extraemos el uuid de los parámetros de la ruta
        const { uuid } = req.params;
        
        // Construimos el objeto DeviceUpdateDto con el uuid y los demás datos del cuerpo de la solicitud
        const device: DeviceUpdateDto = {
            uuid: uuid,
            name: req.body.name,
            description: req.body.description
        };

        const updatedDevice = await update(device);
        res.status(200).json(createTResult(DeviceEntityToDto(updatedDevice)));
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const deleteDevice = async (req: Request, res: Response) => {
    try {
        await deleteDeviceByUuid(req.params.uuid);
        res.status(200).json(createTResult("Device deleted"));
    } catch (err) {
        res.status(500).json({ message: err });
    }
}