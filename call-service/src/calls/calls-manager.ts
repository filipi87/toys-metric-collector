import IDailyConfig from './interfaces/IDailyConfig'
import DailyDispatcher from './daily-dispatcher'
import INewRoom from './interfaces/INewRoom'
import CallsDao from './calls-dao'
import INewStats from './interfaces/INewStat'

class CallsManager {

  private dailyDispatcher
  private callsDao

  constructor(config:IDailyConfig) {
    this.dailyDispatcher = new DailyDispatcher(config)
    this.callsDao = new CallsDao()
  }

  async createRoom({roomName}:INewRoom){
    console.log('Creating conference room', roomName)
    const endDate = Date.now() + (2*24*60*1000) //02 hours from now
    const dailyExpTime = Math.floor(endDate/1000)
    const roomInfo = await this.dailyDispatcher.createNewRoom(roomName, dailyExpTime)
    this.callsDao.createNewRoom(roomInfo)
    console.log('new room', roomInfo)
    return roomInfo
  }

  async removeRoom(roomName:string){
    console.log('Removing conference room', roomName)
    await this.dailyDispatcher.deleteRoom(roomName)
  }

  async saveStatistics(roomId:string, newStats:INewStats){
    console.log('Saving statistics', roomId, newStats)
    this.callsDao.addStats(roomId, newStats)
  }

}

export default CallsManager
