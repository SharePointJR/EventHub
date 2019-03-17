import { IEventInfoState } from '../../components/EventInfo/IEventInfoState';
import * as actionTypes from '../actions/actionTypes';
import { Reducer } from 'redux'
import * as actions from '../actions/eventInfo';

import * as _ from '@microsoft/sp-lodash-subset'
const initialState: any = {
    event: {
        name: '',
        location: '',
        organizers: [],
        numOfMembers: 0,
        meetings: []
    }
};

export const reducer:Reducer<any> = (state: IEventInfoState = initialState, action) => {
    let newState = Object.assign({}, state);

    switch (action.type){
        case actionTypes.INIT_EVENT, actionTypes.SET_EVENT:
            newState.event = action.payload;
            return newState;
        case actionTypes.INCREMENT_MEMBER:
            newState.event.numOfMembers = state.event.numOfMembers + 1;
            return newState;            
        default: 
            return state;
    }
};
