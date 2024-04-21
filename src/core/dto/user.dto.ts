export interface RegisterDto {
    user: UserCreateDto;
}

export interface UserCreateDto {
    name: string;
    email: string;
    password: string;
    confirmed_token: string;
}