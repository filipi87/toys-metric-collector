import { Exception } from '../utils/exception'

class DailyDispatcher {

  private baseDailyUrl
  private apiKey

  constructor (config:{url:string, apiKey:string}) {
    this.baseDailyUrl = config.url
    this.apiKey = config.apiKey
  }

  async _fetchDelete (url:string) {
    const res = await fetch(`${url}`, { method: 'DELETE', headers: { Authorization: `Bearer ${this.apiKey}` } })
    const responseBody = await res.json()
    if (res.status !== 200) {
      console.error(responseBody)
      throw new Exception(res.status, `GET ${url} falhou com statusCode ${res.status}`)
    }
    return responseBody
  }

  async _fetchGet (url:string) {
    const res = await fetch(`${url}`, { method: 'GET', headers: { Authorization: `Bearer ${this.apiKey}` } })
    const responseBody = await res.json()
    if (res.status !== 200) {
      console.error(responseBody)
      throw new Exception(res.status, `GET ${url} falhou com statusCode ${res.status}`)
    }
    return responseBody
  }

  async _fetchPost (url:string, body:string) {
    const res = await fetch(`${url}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` }, body })
    const responseBody = await res.json()
    if (res.status !== 200) {
      console.error(responseBody)
      throw new Exception(res.status, `GET ${url} falhou com statusCode ${res.status}`)
    }
    return responseBody
  }

  async getRooms () {
    return this._fetchGet(`${this.baseDailyUrl}/rooms`)
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
    return this._fetchPost(`${this.baseDailyUrl}/rooms`, JSON.stringify(roomInfo))
  }

  async deleteRoom (name:string) {
    return this._fetchDelete(`${this.baseDailyUrl}/rooms/${name}`)
  }

}

export default DailyDispatcher
