export interface GameDto {
    uuid: string;
    name: string;
    description: string;
}

export interface GameCreateDto {
    name: string;
    description: string;
}

export interface GameUpdateDto {
    uuid: string;
    name: string;
    description: string;
}