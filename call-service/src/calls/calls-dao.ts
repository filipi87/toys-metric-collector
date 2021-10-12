import { Exception } from "../utils/exception"
import INewStats from "./interfaces/INewStat"
import IRoom from "./interfaces/IRoom"

class CallsDao {

    //TODO in the future we can replace to persist the data at Mongo or any other database
    private roomsDatabase
  
    constructor() {
      this.roomsDatabase = new Map()
    }

    createNewRoom(roomInfo:IRoom) {
        if(this.roomsDatabase.has(roomInfo.roomId)){
            throw new Exception(403, 'There is already a room with the same id!')
        }
        roomInfo.users = []
        this.roomsDatabase.set(roomInfo.roomId, roomInfo)
    }

    private getUserFromRoom(roomInfo:IRoom, userId:string) {
        let users = roomInfo.users?.filter((user) => user.id === userId)
        return users && users.length > 0 ? users[0] : null
    }

    addStats(roomId:string, newStats:INewStats) {
        if(!this.roomsDatabase.has(roomId)){
            throw new Exception(404, 'There is no room with the specified id!')
        }
        const roomInfo = this.roomsDatabase.get(roomId) as IRoom
        let user = this.getUserFromRoom(roomInfo, newStats.userInfo.id)
        if(!user){
            user = { ...newStats.userInfo, videoStatistics:[] }
            roomInfo.users.push(user)
        }
        user.videoStatistics.push(newStats.stats)
    }

    getRoom(roomId:string){
        if(!this.roomsDatabase.has(roomId)){
            throw new Exception(404, 'There is no room with the specified id!')
        }
        return this.roomsDatabase.get(roomId) as IRoom
    }
 
}
  
export default CallsDao