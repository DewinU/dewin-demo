'use client'

import { registerUser } from '@/actions/auth'
import { useActionState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

export function RegisterForm() {
  const [state, registerAction, pending] = useActionState(registerUser, null)

  return (
    <form
      onSubmit={e => {}}
      className='flex w-full flex-col gap-4'
      action={registerAction}>
      <div>
        <Label htmlFor='label'>Email</Label>
        <Input
          disabled={pending}
          type='text'
          name='email'
          defaultValue={state?.formData.get('email') as string}
        />
        {state?.errors?.email && (
          <p className='text-red-500'>{state.errors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <Input
          disabled={pending}
          type='password'
          name='password'
          defaultValue={state?.formData.get('password') as string}
        />
        {state?.errors?.password && (
          <span>
            <p className='text-red-500'>Password must:</p>
            <ul>
              {state.errors.password.map((error: string, index: number) => (
                <li key={index} className='text-red-500'>
                  {error}
                </li>
              ))}
            </ul>
          </span>
        )}
      </div>

      <Button className='w-full self-center' type='submit' disabled={pending}>
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Please wait...
          </>
        ) : (
          'Register'
        )}
      </Button>
    </form>
  )
}
