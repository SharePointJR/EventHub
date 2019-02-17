import * as React from 'react';

import styles from './EventInfo.module.scss';
import { IEventInfoState } from './IEventInfoState';
import { MeetingList } from '../MeetingList/MeetingList';

import { IEventHubProps } from '../EventHub/IEventHubProps';
import { sp } from '@pnp/sp';
import { Icon } from 'office-ui-fabric-react';

const initialState: IEventInfoState = {
    event: {
        name: '',
        location: '',
        organizers: [],
        numOfMembers: 0,
        meetings: []
    }
};

class EventInfo extends React.Component<IEventHubProps, IEventInfoState> {

    public readonly state: IEventInfoState = initialState;

    public componentDidMount(): void {
        if (this.props.listName)
        {
            // store the item id
            const id = Number(this.props.listItem);

            sp.web.lists.getByTitle(this.props.listName)
                .items.getById(id).select("Title", "Organizers/Title", "Event_x0020_Location/Address", "Members").expand("Organizers/Title").get().then((item: any) => {
                    
                    // get the location field's values in JSON format
                    const location = JSON.parse(item['Event_x0020_Location']);
                    // get the Organizer field's values
                    const meetingOrganizers = item['Organizers'];

                   
                    // set the event state
                    this.setState({ event: {
                        name: item.Title,
                        location: location.Address.City + ', ' + location.Address.State,
                        organizers: meetingOrganizers.map(o => o.Title),
                        numOfMembers: item['Members'],
                        meetings: []
                        } 
                    });
                }).then(() => {

                    /*const mtgs = [
                        {
                            date: 'tue, mar 12',
                            title: 'TSO365 March',
                            description: 'Lorem ipsum'
                        },
                        {
                            date: 'tue, apr 9',
                            title: 'TSO365 April',
                            description: 'Lorem ipsum'
                        }
                    ]*/

                    const updateEvents = {...this.state.event};

                    sp.web.lists.getByTitle(this.props.meetingListName)
                        .items.filter(`Event_x0020_HubId eq ${id}`).get().then((items: any) => {


                            items.forEach(function (m) {
                                let meetingDate = new Date(m.Start_x0020_Time);
                                
                                updateEvents.meetings.push({
                                    date: meetingDate.toDateString(),
                                    title: m.Title,
                                    description: m.Description
                                });
                            });

                            this.setState({event: updateEvents});
                        });
                });
        }
    }

    public render(): React.ReactElement<any> {
        return (
            <div>
            <div className={styles.EventInfo}>
                <img src="https://secure.meetupstatic.com/photos/event/8/c/e/0/600_466836064.jpeg" alt="test" />
                <div className={styles.Details}>
                    <h2>{this.state.event.name}</h2>
                    <div>
                        <Icon iconName='MapPin' className='MapPin' />
                        {this.state.event.location}
                    </div>
                    <div>
                        <Icon iconName='PartyLeader' className='PartyLeader' />
                        {'Organizers: ' + this.state.event.organizers.join(', ')}
                    </div>
                    <div>
                        <Icon iconName='Group' className='Group' />
                        {this.state.event.numOfMembers + ' members'}
                    </div>
                </div>

                
                </div>
                <hr />
                <MeetingList meetings={this.state.event.meetings} />
            </div>
        );
    }
}

export default EventInfo;