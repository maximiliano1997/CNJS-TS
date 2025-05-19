import { Request, Response } from "express"
import { createUserSchema } from "../../db/schemas/user"
import { db } from "../../db/db"
import { eq } from "drizzle-orm"
import { user } from "../../db/models/schema"
import bcrypt from 'bcryptjs'
import { signToken, verifyToken } from '../../utils/token'

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const validateFields = createUserSchema.safeParse({
            email,
            password
        })
        if (!validateFields.success) {
            return res.status(400).json({
                message: "Not valid credentials",
                error: validateFields.error
            })
        }

        // const result = await db.query.user.findFirst({
        //     where: eq(user.email, email)
        // })

        const sqlExecution = await db.select().from(user).where(eq(user.email, email)).limit(1).execute()
        const result = sqlExecution[0]

        if (!result) {
            return res.status(400).json({
                message: 'Not valid credentials',
                error: validateFields.error
            })
        }

        const { id_user, password: hash } = result
        const valid = bcrypt.compareSync(password, hash)

        if (!valid) {
            return res.status(400).json({
                message: "NOT VALID CREDENTIALS",
                error: "NOT VALID CREDENTIALS ERROR"
            })
        }

        const token = signToken(id_user, email)

        return res.json({
            message: 'Welcomed',
            token,
            user: {
                id_user,
                email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something wrong happen unfortuinately.",
            error
        })
    }
} 