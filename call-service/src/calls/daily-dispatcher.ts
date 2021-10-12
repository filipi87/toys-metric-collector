import { Exception } from '../utils/exception'
import axios from 'axios'
import IRoom from './interfaces/IRoom'

class DailyDispatcher {

  private baseDailyUrl
  private apiKey
  private axios

  constructor (config:{url:string, apiKey:string}) {
    this.baseDailyUrl = config.url
    this.apiKey = config.apiKey
    this.axios = axios.create({
      baseURL: config.url,
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });
  }

  async getRooms () {
    try {
      return this.axios.get(`${this.baseDailyUrl}/rooms`)
    } catch (e:any){
      console.error(e.response?.data)
      throw new Exception(e.response?.status, e.response?.data.info)
    }
  }

  async createNewRoom (roomName:string, endTime:number) {
    const roomInfo = {
      name: roomName,
      privacy: 'public', //private or public
      properties: {
        exp: endTime,
        enable_new_call_ui: true,
        enable_prejoin_ui: false,
        //enable_knocking: true,
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false
      }
    } as any
    try {
      const res = await this.axios.post(`${this.baseDailyUrl}/rooms`, roomInfo)
      return res.data as IRoom
    } catch (e:any){
      console.error(e.response?.data)
      throw new Exception(e.response?.status, e.response?.data.info)
    }
  }

  async deleteRoom (name:string) {
    try {
      return this.axios.delete(`${this.baseDailyUrl}/rooms/${name}`)
    } catch (e:any){
      console.error(e.response?.data)
      throw new Exception(e.response?.status, e.response?.data.info)
    }
  }

}

export default DailyDispatcher
