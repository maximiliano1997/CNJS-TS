import z, { string } from 'zod'

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const userSchema = z.object({
    id_user: z.string(),
    email: z.string().email(),
    password: z.string().refine(password => passwordRegex.test(password), "Not a valid passwords"),
})

export const createUserSchema = userSchema.omit({
    id_user: true
})


export const updateUserSchema = userSchema.partial({
    email: true,
    password: true
})

export const deleteUserSchema = userSchema.omit({
    password: true,
    email: true
})

export type typeUser = z.infer<typeof userSchema>
export type typeCreateUser = z.infer<typeof createUserSchema>
export type typeUpdateUser = z.infer<typeof updateUserSchema>
export type typeDeleteUser = z.infer<typeof deleteUserSchema>


export type userJWTPayload = {
    id_user: string,
    email: string,
}