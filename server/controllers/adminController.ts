import { Request, Response } from 'express';
import db from '../db.js';

export const getAllUsers = (req: Request, res: Response) => {
  const users = db.prepare('SELECT id, name, email, role, phone, location, createdAt FROM users').all();
  res.json(users);
};

export const getAllPropertiesAdmin = (req: Request, res: Response) => {
  const properties = db.prepare('SELECT * FROM properties').all();
  res.json(properties);
};

export const getAllBookingsAdmin = (req: Request, res: Response) => {
  const bookings = db.prepare(`
    SELECT b.*, p.title as propertyTitle, u.name as ownerName, t.name as tenantName
    FROM bookings b
    JOIN properties p ON b.propertyId = p.id
    JOIN users u ON b.ownerId = u.id
    JOIN users t ON b.tenantId = t.id
  `).all();
  res.json(bookings);
};

export const deleteUser = (req: Request, res: Response) => {
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ message: 'User deleted' });
};
