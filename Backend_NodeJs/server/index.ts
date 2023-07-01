import express from 'express'
import bodyParser from 'body-parser';
import routes from '../app/routes/index'
import { Request, Response, NextFunction } from "express";
import cors from 'cors';
class Server {
    port: any
    app: any
    constructor() {
        this.port = 3030
        this.app = express()
    }



    start() {
        this.app.use(cors())
        this.config()
        this.setupRoutes()
        this.listen()
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use('/uploads', express.static('uploads'));
    }

    setupRoutes() {
        this.app.use(routes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        })
    }
}

export default Server