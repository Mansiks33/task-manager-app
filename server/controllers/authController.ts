import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id.toString());

  res.status(201).json({ user: { name: user.name, email: user.email }, token });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id.toString());
  res.status(200).json({ user: { name: user.name, email: user.email }, token });
};


