import { Request, Response, NextFunction } from 'express'
import { userJWTPayload } from '../../db/schemas/user'
import jwt from 'jsonwebtoken'
import { envs } from '../../config/env'

export const validRightUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user } = req.params
        const auth_token = req.headers.auth_token.split(' ') as string

        const user: userJWTPayload = jwt.verify(auth_token[1], envs.SECRET_PASSWORD_KEY) as userJWTPayload

        if (user.id_user !== id_user) {
            return res.status(401).json({
                message: "Not authorized",
                error: "Not authorized"
            })
        }
        console.log("lols!")

        return next()



    } catch (error) {
        return res.json({
            message: 'Something went wrong!!',
            error
        })
    }
}