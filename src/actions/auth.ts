'use server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { createSession, deleteSession } from '@/lib/auth'
import { LoginSchema, RegisterSchema } from '@/validation/authSchema'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function registerUser(state: any, formData: FormData) {
  const validateResult = RegisterSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validateResult.success) {
    return { errors: validateResult.error.flatten().fieldErrors, formData }
  }

  const { email, password } = validateResult.data

  const userExists = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (userExists) {
    return {
      errors: {
        email: 'User with that email already exists.',
        password: undefined,
      },
      formData,
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const data = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id, email: users.email })

  const user = data[0]

  await createSession(user)
  redirect('/todos')
}

export async function loginUser(state: any, formData: FormData) {
  const validateResult = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validateResult.success) {
    return { errors: validateResult.error.flatten().fieldErrors }
  }

  const errorMessage: string = 'Invalid email or password.'
  const { email, password } = validateResult.data

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
    columns: {
      email: true,
      id: true,
      password: true,
    },
  })

  if (!user) return { errors: { form: errorMessage }, formData }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) return { errors: { form: errorMessage }, formData }

  await createSession(user)
  redirect('/todos')
}

export async function logoutUser() {
  await deleteSession()
  redirect('/login')
}
