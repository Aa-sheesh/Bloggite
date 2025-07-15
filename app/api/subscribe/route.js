    import { NextResponse } from 'next/server';
    import mongoose from 'mongoose';

    const MONGODB_URI = process.env.MONGODB_URI;

    const connectDB = async () => {
        if (mongoose.connection.readyState >= 1) return;
        return mongoose.connect(MONGODB_URI);
    };

    const subscriberSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
    }, { timestamps: true });

    const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);

    export async function POST(req) {
        try {
            await connectDB();
            const { email } = await req.json();

            if (!email || !email.includes('@')) {
                return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
            }

            const newSub = new Subscriber({ email });
            await newSub.save();

            return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: 'Email may already be subscribed or server error.' }, { status: 500 });
        }
    }
