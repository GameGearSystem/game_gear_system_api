import { prismaClient } from "../core/config/database";
import { UserCreateDto } from "../core/dto/user.dto";

export const register = async (user: UserCreateDto) => {
    try {
      const newUser = await prismaClient.user.create({
        data: {
          ...user,
        },
      });
  
      return newUser;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };