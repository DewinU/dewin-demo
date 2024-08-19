'use client'

import { logoutUser } from '@/actions/auth'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function LogOutButton() {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      className='w-full self-center'
      onClick={() => {
        startTransition(async () => {
          await logoutUser()
        })
      }}
      disabled={pending}>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        'Log Out'
      )}
    </Button>
  )
}
