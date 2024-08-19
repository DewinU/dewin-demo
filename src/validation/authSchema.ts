import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z
    .string({
      message: 'Email is required.',
    })
    .min(2, {
      message: 'Email must be at least 2 characters long.',
    })
    .trim(),
  password: z
    .string({
      message: 'Password is required.',
    })
    .min(6, {
      message: 'Be at least 6 characters long.',
    })
    .regex(/[0-9]/, {
      message: 'Include at least one number.',
    })
    .trim(),
})

export const LoginSchema = z.object({
  email: z
    .string({
      message: 'Email is required.',
    })
    .trim(),
  password: z
    .string({
      message: 'Password is required.',
    })
    .trim(),
})
