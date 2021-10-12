import IStats from "./IStats";

export default interface IRoom {
  id: string;
  name: string;
  url: string;
  users: [{
    id:string;
    name: string;
    videoStatistics: IStats[]
  }]
}