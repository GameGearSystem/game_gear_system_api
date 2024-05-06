import { Device } from "@prisma/client";
import { DeviceDto } from "../dto/device.dto";

export const DeviceEntityToDto = (device: Device): DeviceDto => {
    return {
        uuid: device.uuid,
        name: device.name,
        description: device.description,
    };
}  

export const DevicesEntityToDto = (devices: Device[]): DeviceDto[] => {
    return devices.map(device => DeviceEntityToDto(device));
}  