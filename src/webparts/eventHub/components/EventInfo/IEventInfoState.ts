export interface IEventInfoState {
    event: {
        name: string,
        location: string,
        organizers: string[],
        numOfMembers: number,
        meetings: any[]
    };
}