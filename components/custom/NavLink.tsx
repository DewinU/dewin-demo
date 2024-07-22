'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname: string = usePathname()
  return (
    <Link className={cn({ 'bg-blue-800': pathname === href })} href={href}>
      {children}
    </Link>
  )
}
