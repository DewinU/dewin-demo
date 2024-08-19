import { LoginForm } from '@/components/auth/LoginForm'

export default function Login() {
  return (
    <main className='mx-auto mt-52 flex max-w-7xl flex-col items-center justify-center'>
      <div className='gap-50 inline-flex flex-col items-center justify-center gap-4 rounded-lg p-4 lg:w-1/3'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-center text-3xl font-bold'>
            Login to your account
          </h1>
          <p className='text-muted-foreground'>
            Enter your information to get started.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
