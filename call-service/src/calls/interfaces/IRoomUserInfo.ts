import IStats from "./IStats";

export default interface IRoomUserInfo {
  id:string;
  name: string;
  videoStatistics: IStats[]
}