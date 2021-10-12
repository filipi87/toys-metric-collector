import IStats from "./IStats";

export default interface INewStats {
    userInfo: {
        id:string,
        name:string
    },
    stats: IStats
}