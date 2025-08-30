import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Subscriber } from '@/lib/models/Subscriber';

export async function POST(req) {
    try {
        await connectDB();
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        // Find and delete the subscriber
        const result = await Subscriber.findOneAndDelete({ email });

        if (!result) {
            return NextResponse.json({ error: 'Email not found in subscribers list' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Unsubscribed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        await connectDB();
        
        // Find and delete the subscriber
        const result = await Subscriber.findOneAndDelete({ email });

        if (!result) {
            return NextResponse.json({ error: 'Email not found in subscribers list' }, { status: 404 });
        }

        // Redirect to a success page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe-success`);
    } catch (error) {
        console.error('Unsubscribe error:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe-error`);
    }
} 