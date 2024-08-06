import NavBar from '@/components/shared/NavBar'

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
