import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = cookies()

  cookieStore.set({
    name: 'admin-token',
    value: '',
    path: '/',
    maxAge: 0, // ✅ delete immediately
  })

  return NextResponse.json({ success: true })
}
