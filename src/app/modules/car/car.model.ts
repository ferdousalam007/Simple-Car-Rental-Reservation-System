import mongoose, { Schema } from 'mongoose';
import { TCar } from './car.interface';

const carSchema = new Schema<TCar>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    isElectric: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
        required: true,
    },
    features: [{
        type: String,
        required: true,
    }],
    pricePerHour: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

export const Car = mongoose.model<TCar>('Car', carSchema);

