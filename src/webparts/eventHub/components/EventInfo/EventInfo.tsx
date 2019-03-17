import * as React from 'react';
import { connect } from 'react-redux';

import styles from './EventInfo.module.scss';
import { IEventInfoState } from './IEventInfoState';
import { MeetingList } from '../MeetingList/MeetingList';

import { Icon } from 'office-ui-fabric-react';

import { IStateProps } from '../../store/IStateProps';
import * as actions from '../../store/actions/eventInfo';
import { IEventHubProps } from '../EventHub/IEventHubProps';

class EventInfo extends React.Component<IStateProps, IEventInfoState> {

    public componentDidMount(): void {

        this.props.onInitEvent(this.props);
    }

    public render(): React.ReactElement<any> {
        return (
            <div>
            <div className={styles.EventInfo}>
                <img src="https://secure.meetupstatic.com/photos/event/8/c/e/0/600_466836064.jpeg" alt="test" />
                <div className={styles.Details}>
                    <h2>{this.props.group.name}</h2>
                    {/*<h2>{this.state.event.name}</h2>*/}
                    <div>
                        <Icon iconName='MapPin' className='MapPin' />
                        {this.props.group.location}
                        {/*{this.state.event.location}*/}
                    </div>
                    <div>
                        <Icon iconName='PartyLeader' className='PartyLeader' />
                        {'Organizers: ' + this.props.group.organizers.join(', ')}
                        {/*{'Organizers: ' + this.state.event.organizers.join(', ')}*/}
                    </div>
                    <div>
                        <Icon iconName='Group' className='Group' />
                        {this.props.group.numOfMembers + ' members'}
                    </div>
                    <div>
                        <button onClick={this.props.onIncrementMembers} >Add Member</button>
                    </div>
                </div>
                
                </div>
                <hr />
                <MeetingList meetings={this.props.group.meetings} />
                {/*<MeetingList meetings={this.state.event.meetings} />*/}
            </div>
        );
    }
}

const mapStateToProps = (state:IEventInfoState, ownProps:IEventHubProps):IStateProps => {
    return {
        description: ownProps.description,
        listName: ownProps.listName,
        listItem: ownProps.listItem,
        meetingListName: ownProps.meetingListName,
        group: {
            ...state.event,
            
        }

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementMembers: () => dispatch({type: 'INCREMENT_MEMBER'}),
        onInitEvent: (wpProps) => dispatch(actions.initEvent(wpProps)) 
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);