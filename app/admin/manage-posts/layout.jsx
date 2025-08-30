// app/admin/add-post/layout.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function ProtectedAddPostLayout({
  children,
}) {
  const token = cookies().get('admin-token')?.value

  if (token !== process.env.ADMIN_SECRET_KEY) {
    redirect('/admin') // back to login page
  }

  return <>{children}</>
}
