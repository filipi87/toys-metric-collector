import { Exception } from "../utils/exception"
import IRoom from "./interfaces/IRoom"
import IRoomStats from "./interfaces/IRoomStats"

class CallsDao {

    //TODO in the future we can replace to persist the data at Mongo or any other database
    private roomsDatabase
  
    constructor() {
      this.roomsDatabase = new Map()
    }

    createNewRoom(roomInfo:IRoom) {
        if(this.roomsDatabase.has(roomInfo.id)){
            throw new Exception(403, 'There is already a room with the same id!')
        }
        this.roomsDatabase.set(roomInfo.id, roomInfo)
    }

    addStats(roomId:string, stats:IRoomStats) {
        if(!this.roomsDatabase.has(roomId)){
            throw new Exception(404, 'There is no room with the specified id!')
        }
    }  
 
}
  
  export default CallsDao