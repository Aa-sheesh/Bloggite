import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, password } = await req.json()

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ success: true })

    // ✅ Set secure cookie valid for 7 days
    res.cookies.set('admin-token', process.env.ADMIN_SECRET_KEY, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production'
    })

    return res
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
}
