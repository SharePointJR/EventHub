import * as React from 'react';
import styles from '../EventHub.module.scss';
import { IEventHubProps } from './IEventHubProps';
import { escape } from '@microsoft/sp-lodash-subset';

import Chrome from '../../statelessComponents/chrome/chrome';
import EventInfo from '../EventInfo/EventInfo';
import Members from '../Members/Members';
import { HashRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';

export default class EventHub extends React.Component<IEventHubProps, {}> {
  
  public render(): React.ReactElement<IEventHubProps> {
    console.log('loading event hub component...')
    return (
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
    );
  }
}
