import NavLink from './NavLink'
import {
  House,
  Squirrel,
  Database,
  Contact,
  Settings,
  BookCheck,
} from 'lucide-react'

export default function NavBar() {
  return (
    <nav className='fixed inset-y-0 left-0 top-0 z-10 flex h-svh flex-col gap-2 border-r px-4 py-6'>
      <div className='flex flex-1 flex-col justify-center gap-2'>
        <NavLink href='/todos' label='Todos'>
          <BookCheck />
        </NavLink>

        <NavLink href='/' label='Home'>
          <House />
        </NavLink>
        <NavLink href='/about' label='About'>
          <Squirrel />
        </NavLink>
        <NavLink href='/blog' label='Blog'>
          <Database />
        </NavLink>
        <NavLink href='/contact' label='Contact'>
          <Contact />
        </NavLink>
      </div>
      <NavLink href='/settings' label='Settings'>
        <Settings />
      </NavLink>
    </nav>
  )
}
