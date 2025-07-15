// app/api/admin/login/route.js
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, password } = await req.json()

  if (
    email === 'aashishs4912345@gmail.com' &&
    password === 'Peedhu483!'
  ) {
    const response = NextResponse.json({ success: true })

    response.cookies.set('admin-auth', 'loggedin', {
      httpOnly: false, // allow client-side access
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
}
