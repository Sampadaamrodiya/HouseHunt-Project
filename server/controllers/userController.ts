import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { generateToken } from '../middleware/authMiddleware.js';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, role, location } = req.body;

  try {
    const userExists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = db.prepare(
      'INSERT INTO users (name, email, password, phone, role, location) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(name, email, hashedPassword, phone, role || 'renter', location);

    const userId = result.lastInsertRowid as number;

    res.status(201).json({
      id: userId,
      name,
      email,
      role: role || 'renter',
      token: generateToken(userId, role || 'renter'),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req: any, res: Response) => {
  const user = db.prepare('SELECT id, name, email, role, phone, location, profileImage FROM users WHERE id = ?').get(req.user.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
