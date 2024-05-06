export interface DeviceDto {
    uuid: string;
    name: string;
    description: string;
}

export interface DeviceCreateDto {
    name: string;
    description: string;
}

export interface DeviceUpdateDto {
    uuid: string;
    name: string;
    description: string;
}