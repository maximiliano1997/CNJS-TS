import { Request, Response } from "express"
import { deleteUserSchema } from "../../db/schemas/user"
import { db } from "../../db/db"
import { user } from "../../db/models/schema"
import { eq } from "drizzle-orm"




export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const { id_user } = req.params

        const validFields = deleteUserSchema.safeParse({
            id_user
        })
        if (!validFields.success) {
            return res.json({
                message: "Not valid data",
                error: validFields.error
            })
        }

        const userDeleted = await db.delete(user).where(eq(user.id_user, id_user)).returning({
            id_user: user.id_user,
            email: user.email,
        })

        return res.status(200).json({
            message: `User deleted`,
            user: userDeleted.at(0)

        })


    } catch (error) {
        if ((error as any)?.libsqlError) {
            return res.status(500).json({
                message: error,
                error
            });
        }
        res.status(500).json({
            message: `Something wrong happen unfortunately`,
            error
        })

    }
}