import { Exception } from "../utils/exception"
import INewStats from "./interfaces/INewStat"
import IRoom from "./interfaces/IRoom"

class CallsDao {

    //TODO in the future we can replace to persist the data at Mongo or any other database
    private static roomsDatabase = new Map()
  
    createNewRoom(roomInfo:IRoom) {
        if(CallsDao.roomsDatabase.has(roomInfo.roomId)){
            throw new Exception(403, 'There is already a room with the same id!')
        }
        roomInfo.users = []
        CallsDao.roomsDatabase.set(roomInfo.roomId, roomInfo)
    }

    private getUserFromRoom(roomInfo:IRoom, userId:string) {
        let users = roomInfo.users?.filter((user) => user.id === userId)
        return users && users.length > 0 ? users[0] : null
    }

    addStats(roomId:string, newStats:INewStats) {
        if(!CallsDao.roomsDatabase.has(roomId)){
            throw new Exception(404, 'There is no room with the specified id!')
        }
        const roomInfo = CallsDao.roomsDatabase.get(roomId) as IRoom
        let user = this.getUserFromRoom(roomInfo, newStats.userInfo.id)
        if(!user){
            user = { ...newStats.userInfo, videoStatistics:{
                    videoRecvBitsPerSecond:[],
                    videoRecvPacketLoss:[],
                    videoSendBitsPerSecond:[],
                    videoSendPacketLoss:[]
                }
            }
            roomInfo.users.push(user)
        }
        (Object.keys(user.videoStatistics) as Array<keyof typeof user.videoStatistics>).forEach((key) => {
            user!.videoStatistics[key].push(newStats.stats[key])
        })
    }

    getRoom(roomId:string){
        if(!CallsDao.roomsDatabase.has(roomId)){
            throw new Exception(404, 'There is no room with the specified id!')
        }
        return CallsDao.roomsDatabase.get(roomId) as IRoom
    }

    getRooms() {
        const rooms = Array.from(CallsDao.roomsDatabase, ([key, value]) => ({ roomId: value.roomId, url:value.url }))
        return rooms
    }

    static clearDatabase() {
        this.roomsDatabase.clear()
    }
 
}
  
export default CallsDao