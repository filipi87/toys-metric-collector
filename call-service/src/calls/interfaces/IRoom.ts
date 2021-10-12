import IRoomUserInfo from "./IRoomUserInfo";

export default interface IRoom {
  id: string;
  name: string;
  url: string;
  users: IRoomUserInfo[]
}