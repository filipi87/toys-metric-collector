import IRoomUserInfo from "./IRoomUserInfo";

export default interface IRoom {
  roomId: string;
  url: string;
  users: IRoomUserInfo[]
}