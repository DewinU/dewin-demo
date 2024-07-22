import NavLink from './NavLink'
import { House, Squirrel, Database, Contact } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className='flex gap-4 items-center justify-between'>
      <NavLink href='/'>
        <House /> Home
      </NavLink>
      <NavLink href='/about'>
        <Squirrel />
        About
      </NavLink>
      <NavLink href='/blog'>
        <Database />
        Blog
      </NavLink>
      <NavLink href='/contact'>
        <Contact />
        Contact
      </NavLink>
    </nav>
  )
}
