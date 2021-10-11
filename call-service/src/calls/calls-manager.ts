import IDailyConfig from './interfaces/IDailyConfig'
import DailyDispatcher from './daily-dispatcher'
import INewRoom from './interfaces/INewRoom'

class CallsManager {

  private dailyDispatcher

  constructor(config:IDailyConfig) {
    this.dailyDispatcher = new DailyDispatcher(config)
  }

  async createRoom({roomName}:INewRoom){
    console.log('Creating conference room', roomName)
    const endDate = Date.now() + (2*24*60*1000) //02 hours from now
    const dailyExpTime = Math.floor(endDate/1000)
    const roomInfo = await this.dailyDispatcher.createNewRoom(roomName, dailyExpTime)
    console.log('new room', roomInfo)
    return roomInfo
  }

  async removeRoom(roomName:string){
    console.log('Removing booking', roomName)
    await this.dailyDispatcher.deleteRoom(roomName)
  }

}

export default CallsManager
