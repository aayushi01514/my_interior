import mongoose, { Schema, Document } from 'mongoose';

export interface IDesignProject extends Document {
  title: string;
  description: string;
  frontimg: string;
  frontimgalt: string;
  style: string;
  location: string;
  budget: number;
  slug: string;
  variations: Array<{
    image: string;
    price: number;
    variationtitle: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const VariationSchema = new Schema({
  image: { type: String },
  price: { type: Number },
  variationtitle: { type: String },
});

const DesignProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  frontimg: { type: String, required: true },
  frontimgalt: { type: String, required: true },
  style: { type: String, required: true },
  location: { type: String, required: true },
  budget: { type: Number, required: true },
  slug: { type: String, required: true, unique: true },
  variations: [VariationSchema],
}, { timestamps: true });

export default mongoose.models.DesignProject || mongoose.model<IDesignProject>('DesignProject', DesignProjectSchema);
