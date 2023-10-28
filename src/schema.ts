import z from 'zod'

export const userSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  password: z
    .string({
      required_error: 'Password is required.',
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe('Your secure password')
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),
})

export type User = z.infer<typeof userSchema>

export type UserSummary = {
  id: number
  username: string
}
