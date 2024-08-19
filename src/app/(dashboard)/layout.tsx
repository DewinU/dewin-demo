import { AuthProvider } from '@/components/auth/AuthProvider'
import NavBar from '@/components/shared/NavBar'
import { getUser } from '@/data/user'
import { verifySession } from '@/lib/auth'

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUserPromise = getUser()

  return (
    <>
      <AuthProvider userPromise={currentUserPromise}>
        <NavBar />
        {children}
      </AuthProvider>
    </>
  )
}
