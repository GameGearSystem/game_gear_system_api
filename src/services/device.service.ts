import { prismaClient } from "../core/config/database";
import { DeviceCreateDto, DeviceUpdateDto } from "../core/dto/device.dto";


export const getAll = async () => {
    try {
      const devices = await prismaClient.device.findMany();
  
      return devices;
    } catch (err) {
      throw new Error("Error getting devices");
    }
}

export const getByUuid = async (uuid: string) => {
  try {
    const device = await prismaClient.device.findUnique({
      where: {
        uuid,
      },
    });

    return device;
  } catch (err) {
    throw new Error("Error getting device");
  }
}

export const register = async (device: DeviceCreateDto) => {
  try {
    const newDevice = await prismaClient.device.create({
      data: {
        ...device,
      },
    });

    return newDevice;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const update = async (device: DeviceUpdateDto) => {
  try {
    const updatedDevice = await prismaClient.device.update({
      where: {
        uuid: device.uuid,
      },
      data: {
        ...device,
      },
    });
    return updatedDevice;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export const deleteDeviceByUuid = async (uuid: string) => {
  try {
    await prismaClient.device.delete({
      where: {
        uuid,
      },
    });
  } catch (err) {
    throw new Error("Error deleting device");
  }
}