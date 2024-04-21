import { Request, Response } from "express";
import { RegisterDto } from "../core/dto/user.dto";
import { generateToken, hashPassword } from "../core/utils/security";
import { register as RegisterUser } from "../services/user.service";

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