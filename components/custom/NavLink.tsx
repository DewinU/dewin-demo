'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function NavLink({
  href,
  children,
  className,
  label,
}: {
  href: string
  children: React.ReactNode
  label: string
  className?: string
}) {
  const pathname: string = usePathname()
  return (
    <Link
      className={cn(
        className,
        'flex gap-1 rounded-md px-4 py-2 transition-colors',
        {
          'pointer-events-none bg-blue-800 text-white': pathname === href,
          'hover:bg-blue-800/20': pathname !== href,
        },
        className,
      )}
      href={href}>
      {children}
      <span className='hidden md:flex'>{label}</span>
    </Link>
  )
}
