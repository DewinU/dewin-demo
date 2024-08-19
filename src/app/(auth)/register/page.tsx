import { RegisterForm } from '@/components/auth/RegisterForm'

export default function Register() {
  return (
    <main className='mx-auto mt-52 flex max-w-7xl flex-col items-center justify-center'>
      <div className='gap-50 inline-flex flex-col items-center justify-center gap-4 rounded-lg p-4 lg:w-1/3'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-center text-3xl font-bold'>Create an account</h1>
          <p className='text-muted-foreground'>
            Enter your information to get started.
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}
