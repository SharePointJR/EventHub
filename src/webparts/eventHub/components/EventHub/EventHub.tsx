import * as React from 'react';
import styles from '../EventHub.module.scss';
import { IEventHubProps } from './IEventHubProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Chrome from '../../statelessComponents/chrome/chrome';
import EventInfo from '../EventInfo/EventInfo';
import Members from '../Members/Members';
import { HashRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import {reducer} from '../../store/reducers/EventInfo';

import { IStateProps } from '../../store/IStateProps';
 


export default class EventHub extends React.Component<IEventHubProps, {}> {
  private store: Store<IStateProps>;

  public constructor(props:IEventHubProps) {
    super(props);

    this.store = createStore(
      reducer, 
      applyMiddleware(thunk)
    );
  }
 

  public render(): React.ReactElement<IStateProps> {
    return (
      <Provider store={this.store}>
        <HashRouter>
          <Chrome>
            <Switch>
                <Route path="/members" component={Members} />
                <Route 
                  path="/" 
                  exact 
                  render={() => (<EventInfo {...this.props} />) } />
                <Route render={() => <h1>Page Not found</h1>} />
            </Switch>
          </Chrome>
        </HashRouter>
      </Provider>
    );
  }
}
