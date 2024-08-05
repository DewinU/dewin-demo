import NavBar from '@/components/custom/NavBar'

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
