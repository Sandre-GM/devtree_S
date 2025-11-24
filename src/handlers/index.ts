import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(409).json({ error: error.message });
  }

  const user = new User(req.body);
  user.password = await hashPassword(password);
  await user.save();
  res.status(201).send("Usuario creado correctamente");
};
