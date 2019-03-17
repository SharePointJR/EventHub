import * as React from 'react';

import styles from './MeetingList.module.scss';

import { IMeetingListProps } from './IMeetingListProps';

export class MeetingList extends React.Component<any, any> {

    public render(): React.ReactElement<any> {
        const mtgs = Object.keys(this.props.meetings)
        .map(mKey => {
            console.log('m: ' + this.props.meetings);
            console.log('c: ' + this.props.children);
            return (
                <li key={mKey}>
                    <h3 className={styles.Date}>{this.props.meetings[mKey].date}</h3>
                    <h2 className={styles.Title}>{this.props.meetings[mKey].title}</h2>
                    <p className={styles.Description}>{this.props.meetings[mKey].description}</p>
                </li>
            );
        });

        return(
            <ul className={styles.MeetingList}> 
                {mtgs} 
            </ul>
        );
    };
};

