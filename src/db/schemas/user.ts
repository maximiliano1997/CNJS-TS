import z from 'zod'

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const userSchema = z.object({
    id_user: z.string(),
    email: z.string().email(),
    password: z.string().refine(password => passwordRegex.test(password), "Not a valid passwords"),
})

export const createUserSchema = userSchema.omit({
    id_user: true
})


export type typeUser = z.infer<typeof userSchema>
export type typeCreateUser = z.infer<typeof createUserSchema>