import { Exception } from '../utils/exception'
import axios from 'axios'

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
    return this.axios.get(`${this.baseDailyUrl}/rooms`)
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
    }
    return this.axios.post(`${this.baseDailyUrl}/rooms`, roomInfo)
  }

  async deleteRoom (name:string) {
    return this.axios.delete(`${this.baseDailyUrl}/rooms/${name}`)
  }

}

export default DailyDispatcher
