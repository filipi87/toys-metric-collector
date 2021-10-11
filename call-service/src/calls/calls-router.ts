import express from 'express'
import CallsManager from './calls-manager'
import IDailyConfig from './interfaces/IDailyConfig'

const getCallsPublicRoutes = (config:IDailyConfig) => {

  const router = express.Router()
  const callsManager = new CallsManager(config)

  router.post('/rooms', async (req, res) => {
    try {
      await callsManager.createRoom(req.body)
      res.sendStatus(200)
    } catch (exception:any) {
      console.error(exception)
      res.sendStatus(exception?.statusCode || 500)
    }
  })

  router.delete('/rooms/:roomName', async (req, res) => {
    try {
      await callsManager.removeRoom(req.params.roomName)
      res.sendStatus(200)
    } catch (exception:any) {
      console.error(exception)
      res.sendStatus(exception?.statusCode || 500)
    }
  })

  return router
}

export {getCallsPublicRoutes}
