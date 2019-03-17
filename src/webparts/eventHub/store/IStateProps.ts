import { IEventInfoState } from "../components/EventInfo/IEventInfoState";
import { IEventHubProps } from "../components/EventHub/IEventHubProps";
import { IEventHubWebPartProps } from "../EventHubWebPart";

export interface IStateProps extends IEventHubWebPartProps {
    group?: {
        name: string,
        location: string,
        organizers: string[],
        numOfMembers: number,
        meetings: any[],
        
    },
    onIncrementMembers?: () => any;
    onInitEvent?: (props:any) => any;
}