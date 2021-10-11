import express from 'express'
import { getCallsPublicRoutes } from './calls/calls-router'

class AppService {

    private app = express()
    private config: any

    //TODO fix the config type
    constructor (config:any) {
        this.config = config
        this.initialize()
    }

    initialize () {
        this.app.use(express.json())
        const router = express.Router()
        this.app.use(router)
        router.get('/healthy', (req, res) => res.sendStatus(200))
        //TODO in the future it will probably a good idea to add an auth middleware to check if the user is authenticated and authorized
        this.app.use('/calls/v1', /*openApiValidator,*/ getCallsPublicRoutes(this.config.daily))
    }

    getApp () {
        return this.app
    }

}

export default AppService
