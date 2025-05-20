import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Generate JWT
const generateToken = (userId: any) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};

// Register 
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists' });
       return;
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });
    res.status(201).json({ token });
  } catch (err: any) {
    console.error('Registration Error: ', err);
    res.status(500).json({ message: 'Registration failed', error: (err as Error).message });
  }
});

// Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))){
     res.status(401).json({ message: 'Invalid email or password' });
    return;
}
    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: (err as Error).message });
  }
});

export default router;
