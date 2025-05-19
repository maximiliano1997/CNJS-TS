import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../../utils/token'

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.auth_token as string
    console.log(token.split(' ')[1])
    const tokenOutBearer = token.split(' ')[1]
    const valid = verifyToken(tokenOutBearer)

    if (valid) {
        return next()
    }

    return res.status(401).json({
        message: 'Not valid token!1',
        error: 'Not valid token'
    })

}