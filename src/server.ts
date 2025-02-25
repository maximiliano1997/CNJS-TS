import express, { Express } from 'express'
import cors from 'cors'

import userRouter from '../src/routes/user'

export class Server {


    private app: Express;
    private port: Number;


    constructor() {
        this.app = express()
        this.port = 3000;

        this.applyMiddlewares()
        this.routes()
    }

    applyMiddlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    routes() {
        this.app.get("/ping", (req, res) => {
            res.send('pong');
        })
        this.app.use('/user', userRouter)
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }
}