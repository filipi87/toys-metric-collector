import IStats from "./IStats";

export default interface IRoomUserInfo {
  id:string;
  name: string;
  videoStatistics: {
    videoRecvBitsPerSecond:number[],
    videoRecvPacketLoss:number[],
    videoSendBitsPerSecond:number[],
    videoSendPacketLoss:number[]
  }
}