    import { NextResponse } from 'next/server';
    import mongoose from 'mongoose';
    import connectDB from '@/lib/db';
    import { Subscriber } from '@/lib/models/Subscriber';
    import { sendWelcomeEmail } from '@/lib/email';



    export async function POST(req) {
        try {
            await connectDB();
            const { email } = await req.json();

            if (!email || !email.includes('@')) {
                return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
            }

            const newSub = new Subscriber({ email });
            await newSub.save();

            // Send welcome email
            try {
                await sendWelcomeEmail(email);
            } catch (error) {
                console.error('Failed to send welcome email:', error);
                // Don't fail the subscription if email fails
            }

            return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: 'Email is already subscribed!' }, { status: 500 });
        }
    }
