import { Request, Response } from 'express'
const bcrypt = require('bcryptjs')
import { db } from '../../db/db'
import { user } from '../../db/models/schema';
import { createUserSchema } from '../../db/schemas/user'




export const createUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const validateFields = createUserSchema.safeParse({
            email,
            password
        })

        if (!validateFields.success) {
            return res.status(400).json({
                message: "Not valid Data -> Bad Request",
                error: validateFields.error
            })
        }


        const hashPassword = bcrypt.hashSync(password)

        const result = await db.insert(user).values({
            email,
            id_user: crypto.randomUUID(),
            password: hashPassword,
        }).returning({
            email: user.email,
            id_user: user.id_user,
        })

        res.json({
            message: 'User created.',
            user: result.at(0)
        })
    } catch (error) {
        if ((error as any)?.libsqlError) {
            return res.status(500).json({
                messagE: "Email already taken",
                error
            })
        }
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
}