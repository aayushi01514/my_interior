import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  title: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
