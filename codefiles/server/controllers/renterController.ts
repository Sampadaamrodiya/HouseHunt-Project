import { Request, Response } from 'express';
import db from '../db.js';

export const getAllProperties = (req: Request, res: Response) => {
  const { location, type, minPrice, maxPrice } = req.query;
  let query = 'SELECT * FROM properties';
  const params: any[] = [];

  if (location) {
    query += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }
  if (type) {
    query += ' AND propertyType = ?';
    params.push(type);
  }
  if (minPrice) {
    query += ' AND rentAmount >= ?';
    params.push(minPrice);
  }
  if (maxPrice) {
    query += ' AND rentAmount <= ?';
    params.push(maxPrice);
  }

  const properties = db.prepare(query).all(...params);
  res.json(properties);
};

export const getPropertyById = (req: Request, res: Response) => {
  const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
};

export const bookProperty = (req: any, res: Response) => {
  const { propertyId } = req.body;
  const tenantId = req.user.id;

  try {
    const property: any = db.prepare('SELECT * FROM properties WHERE id = ?').get(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.status === 'booked') return res.status(400).json({ message: 'Property already booked' });

    const tenant: any = db.prepare('SELECT name, phone FROM users WHERE id = ?').get(tenantId);

    db.prepare(
      'INSERT INTO bookings (propertyId, ownerId, tenantId, tenantName, phone) VALUES (?, ?, ?, ?, ?)'
    ).run(propertyId, property.ownerId, tenantId, tenant.name, tenant.phone);

    res.status(201).json({ message: 'Booking request sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserBookings = (req: any, res: Response) => {
  const bookings = db.prepare(`
    SELECT b.*, p.title as propertyTitle, p.location as propertyLocation, p.rentAmount
    FROM bookings b
    JOIN properties p ON b.propertyId = p.id
    WHERE b.tenantId = ?
  `).all(req.user.id);
  res.json(bookings);
};
