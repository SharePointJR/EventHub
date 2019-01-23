import * as React from 'react';

import styles from './Logo.module.scss';

import { Icon } from 'office-ui-fabric-react';

const logo = () => (
    <div className={styles.Logo}>
        <Icon iconName='ScheduleEventAction' className='ScheduleEventAction' />
    </div>
);

export default logo;