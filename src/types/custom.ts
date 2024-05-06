import { JwtPayload } from "jsonwebtoken";

export type User = {
    userId: string | JwtPayload;
};