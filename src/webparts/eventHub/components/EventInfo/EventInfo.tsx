import * as React from 'react';

import styles from './EventInfo.module.scss';
import { IEventInfoState } from './IEventInfoState';

const initialState: IEventInfoState = {
    event: {
        name: 'Tri-State Office 365 User Group',
        location: 'Malvern, PA',
        organizers: ['Jason', 'Michael'],
        numOfAttendees: 33
    }
}

class EventInfo extends React.Component<any, IEventInfoState> {

    readonly state: IEventInfoState = initialState;

    public render(): React.ReactElement<any> {
        return (
            <div className={styles.EventInfo}>
                <img src="https://secure.meetupstatic.com/photos/event/8/c/e/0/600_466836064.jpeg" alt="test" />
                <div className={styles.Details}>
                    <h2>{this.state.event.name}</h2>
                    <div>{this.state.event.location}</div>
                    <div>{'Organizers: ' + this.state.event.organizers.join(', ')}</div>
                    <div>{this.state.event.numOfAttendees + ' attendees'}</div>
                </div>
            </div>
        );
    }
}

export default EventInfo;