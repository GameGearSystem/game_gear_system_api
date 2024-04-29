import { Request, Response } from "express";
import { RegisterDto } from "../core/dto/user.dto";
import { generateToken, hashPassword } from "../core/utils/security";
import { register as RegisterUser, getAll } from "../services/user.service";
import { sendConfirmationEmail } from "../core/utils/email_sender";
import { createTResult } from "../core/mappers/tresult.mappers";
import { UsersEntityToDto } from "../core/mappers/user.mapper";

export const createUser = async (req: Request, res: Response) => {
    try {
      const { user } = req.body as RegisterDto;
        
      user.password = await hashPassword(user.password);
      user.confirmed_token = await generateToken(user.email);
  
      await RegisterUser(user);
     
      await sendConfirmationEmail(user.name, user.email, user.confirmed_token);
  
      res.status(201).json(createTResult(true));
      
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAll();
    res.status(200).json(createTResult(UsersEntityToDto(users)));
  } catch (err) {
    res.status(500).json({ message: err });
  }
}