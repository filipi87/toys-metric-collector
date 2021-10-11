import request from 'supertest'
import AppService from '../app'
import { config } from '../../config/config'

describe('Healthy', () => {
  let app:Express.Application

  beforeAll(async () => {
    const appService = new AppService(config)
    app = appService.getApp()
  })

  it('Healthy', async () => {
    const res = await request(app).get('/healthy')
    expect(res.statusCode).toBe(200)
  })

})
