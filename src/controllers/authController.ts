import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {generateToken} from '../utils/jwt'
import {User} from '../models/User';

export async function signUp(req: Request, res: Response) {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({message: "All fields are required"});
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({message: "Email is already registered"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role
    });
    return res.status(201).json({
      status: 201,
      message: "User registered successfully"
    });
  } catch{
    return res.status(500).json({error: "Error registering user"});
  }
}

const maxAge = 60*60;
export async function signIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
        _id: user._id.toString(),
        email: user.email
    });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: maxAge * 1000
    })

    return res.status(200).json({
        status: 200,
        data: user.fullName
    })
  } catch{
    return res.status(500).json({ error: 'Error logging in'});
  }
}