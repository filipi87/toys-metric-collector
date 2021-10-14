import request from 'supertest'
import AppService from '../app'
import { config } from '../../config/config'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import CallsDao from '../calls/calls-dao'

const defaultDailyRoomProperties = {
  privacy: 'public',
  properties: {
    enable_new_call_ui: true,
    enable_prejoin_ui: true,
    enable_screenshare: true,
    enable_chat: true,
    start_video_off: false,
    start_audio_off: false
  }
}

describe('Public Routes', () => {
  const BASE_URL = '/calls/v1'
  const DAILY_BASE_URL = config.daily.url
  let app:any
  let mock:any

  beforeAll(async () => {
    mock = new MockAdapter(axios)
    const appService = new AppService(config)
    app = appService.getApp()
  })

  afterEach(() => {
    mock.reset()
    CallsDao.clearDatabase()
  })

  it('Healthy', async () => {
    const res = await request(app).get('/healthy')
    expect(res.statusCode).toBe(200)
  })

  it('New Room', async () => {
    const body = {roomId:`r-${Date.now()}`}
    mock.onPost(`${DAILY_BASE_URL}/rooms`).reply(200, {
      url: `http://test.daily.com`
    })
    const res = await request(app).post(`${BASE_URL}/rooms`).send(body)
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(mock.history.post[0].data).name).toEqual(body.roomId)
    expect(JSON.parse(mock.history.post[0].data).privacy).toEqual(defaultDailyRoomProperties.privacy)
    expect(JSON.parse(mock.history.post[0].data).properties).toEqual(expect.objectContaining(defaultDailyRoomProperties.properties))
  })

  it('Delete Room', async () => {
    const body = {roomId:`r-${Date.now()}`}
    mock.onDelete(`${DAILY_BASE_URL}/rooms/${body.roomId}`).reply(200)
    const res = await request(app).delete(`${BASE_URL}/rooms/${body.roomId}`).send(body)
    expect(res.statusCode).toBe(200)
  })

  it('Send statistics', async () => {
    //creating new room
    const roomInfo = {roomId:`r-${Date.now()}`}
    mock.onPost(`${DAILY_BASE_URL}/rooms`).reply(200, {
      url: `http://test.daily.com`
    })
    const newRoomRes = await request(app).post(`${BASE_URL}/rooms`).send(roomInfo)
    expect(newRoomRes.statusCode).toBe(200)
    //sending statistics
    const body = {
      userInfo: {
        id: 'testUserId',
        name: 'testUser'
      },
      stats: {
        videoRecvBitsPerSecond: 0,
        videoRecvPacketLoss: 0,
        videoSendBitsPerSecond: 0,
        videoSendPacketLoss: 0
      }
    }
    const res = await request(app).post(`${BASE_URL}/rooms/${roomInfo.roomId}/stats`).send(body)
    expect(res.statusCode).toBe(200)
  })

  it('Get all rooms', async () => {
    //creating new room
    const roomInfo = {roomId:`r-${Date.now()}`}
    mock.onPost(`${DAILY_BASE_URL}/rooms`).reply(200, {
      url: `http://test.daily.com`
    })
    const newRoomRes = await request(app).post(`${BASE_URL}/rooms`).send(roomInfo)
    expect(newRoomRes.statusCode).toBe(200)
    //getting all rooms
    const res = await request(app).get(`${BASE_URL}/rooms`)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
  })

})



