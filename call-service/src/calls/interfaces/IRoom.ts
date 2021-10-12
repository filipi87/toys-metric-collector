import IRoomStats from "./IRoomStats";

export default interface IRoom {
  id: string;
  name: string;
  url: string;
  videoStatistics: IRoomStats
}