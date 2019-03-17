import * as actionTypes from './actionTypes';
import { sp } from '@pnp/sp';
import { IEventHubWebPartProps } from '../../EventHubWebPart';

export const incrementMembers = () => {
    return {
        type: actionTypes.INCREMENT_MEMBER,
        
    };
};

export const setEvent = (event) => {
    return {
        type: actionTypes.SET_EVENT,
        payload: event
    }
};  

export const initEvent = (props:IEventHubWebPartProps) => dispatch => {
    let selectedEvent:any = {};

    if (props.listName)
    {
        // store the item id
        const id = Number(props.listItem);

        sp.web.lists.getByTitle(props.listName)
            .items.getById(id).select("Title", "Organizers/Title", "Event_x0020_Location/Address", "Members").expand("Organizers/Title").get().then((item: any) => {
                
                // get the location field's values in JSON format
                const location = JSON.parse(item['Event_x0020_Location']);
                // get the Organizer field's values
                const meetingOrganizers = item['Organizers'];

                
                // set the event state
                selectedEvent = { 
                    event: {
                        name: item.Title,
                        location: location.Address.City + ', ' + location.Address.State,
                        organizers: meetingOrganizers.map(o => o.Title),
                        numOfMembers: item['Members'],
                        meetings: []
                    } 
                };
            }).then(() => {
                const updateEvents = {...selectedEvent.event};

                sp.web.lists.getByTitle(props.meetingListName)
                    .items.filter(`Event_x0020_HubId eq ${id}`).get().then((items: any) => {


                        items.forEach(function (m) {
                            let meetingDate = new Date(m.Start_x0020_Time);
                            
                            updateEvents.meetings.push({
                                date: meetingDate.toDateString(),
                                title: m.Title,
                                description: m.Description
                            });
                        });

                        selectedEvent.event = updateEvents;
                        dispatch(setEvent(selectedEvent.event));
                    });
            });
    }
};