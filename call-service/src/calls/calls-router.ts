import express from 'express'
import CallsManager from './calls-manager'
import IDailyConfig from './interfaces/IDailyConfig'

const getCallsPublicRoutes = (config:IDailyConfig) => {

  const router = express.Router()
  const callsManager = new CallsManager(config)

  router.get('/rooms', async (req, res) => {
    try {
      const roomsInfo = await callsManager.getRooms()
      res.status(200).send(roomsInfo)
    } catch (exception:any) {
      console.error(exception)
      res.status(exception.statusCode || 500).send(exception.message)
    }
  })

  router.post('/rooms', async (req, res) => {
    try {
      const roomInfo = await callsManager.createRoom(req.body)
      res.status(200).send(roomInfo)
    } catch (exception:any) {
      console.error(exception)
      res.status(exception.statusCode || 500).send(exception.message)
    }
  })

  router.delete('/rooms/:roomId', async (req, res) => {
    try {
      await callsManager.removeDailyRoom(req.params.roomId)
      res.sendStatus(200)
    } catch (exception:any) {
      console.error(exception)
      res.status(exception.statusCode || 500).send(exception.message)
    }
  })

  router.get('/rooms/:roomId', async (req, res) => {
    try {
      const roomInfo = await callsManager.getRoom(req.params.roomId)
      res.status(200).send(roomInfo)
    } catch (exception:any) {
      console.error(exception)
      res.status(exception.statusCode || 500).send(exception.message)
    }
  })

  router.post('/rooms/:roomId/stats', async (req, res) => {
    try {
      const roomId = req.params.roomId
      await callsManager.saveStatistics(roomId, req.body)
      res.sendStatus(200)
    } catch (exception:any) {
      console.error(exception)
      res.status(exception.statusCode || 500).send(exception.message)
    }
  })

  return router
}

export {getCallsPublicRoutes}
