import { Request, Response } from 'express';
import db from '../db.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const addProperty = (req: AuthRequest, res: Response) => {
  const { title, description, location, rentAmount, propertyType, bedrooms, amenities } = req.body;
  const ownerId = req.user?.id;

  // Handle images from multer if implemented, for now just placeholder
  const images = JSON.stringify([]); 

  try {
    const result = db.prepare(
      'INSERT INTO properties (title, description, location, rentAmount, propertyType, bedrooms, amenities, images, ownerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(title, description, location, rentAmount, propertyType, bedrooms, amenities, images, ownerId);

    res.status(201).json({ id: result.lastInsertRowid, message: 'Property added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOwnerProperties = (req: AuthRequest, res: Response) => {
  const properties = db.prepare('SELECT * FROM properties WHERE ownerId = ?').all(req.user?.id);
  res.json(properties);
};

export const updateProperty = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, location, rentAmount, propertyType, bedrooms, amenities, status } = req.body;

  try {
    const property: any = db.prepare('SELECT * FROM properties WHERE id = ?').get(id);
    if (!property || property.ownerId !== req.user?.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    db.prepare(
      'UPDATE properties SET title = ?, description = ?, location = ?, rentAmount = ?, propertyType = ?, bedrooms = ?, amenities = ?, status = ? WHERE id = ?'
    ).run(title, description, location, rentAmount, propertyType, bedrooms, amenities, status, id);

    res.json({ message: 'Property updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProperty = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const property: any = db.prepare('SELECT * FROM properties WHERE id = ?').get(id);
    if (!property || property.ownerId !== req.user?.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    db.prepare('DELETE FROM properties WHERE id = ?').run(id);
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOwnerBookings = (req: AuthRequest, res: Response) => {
  const bookings = db.prepare(`
    SELECT b.*, p.title as propertyTitle, u.name as tenantName, u.phone as tenantPhone 
    FROM bookings b
    JOIN properties p ON b.propertyId = p.id
    JOIN users u ON b.tenantId = u.id
    WHERE b.ownerId = ?
  `).all(req.user?.id);
  res.json(bookings);
};

export const updateBookingStatus = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // approved, rejected

  try {
    const booking: any = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);
    if (!booking || booking.ownerId !== req.user?.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    db.prepare('UPDATE bookings SET bookingStatus = ? WHERE id = ?').run(status, id);
    
    if (status === 'approved') {
      db.prepare('UPDATE properties SET status = "booked" WHERE id = ?').run(booking.propertyId);
    }

    res.json({ message: `Booking ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
