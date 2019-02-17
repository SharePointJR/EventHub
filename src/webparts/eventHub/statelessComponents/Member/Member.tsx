import * as React from 'react';

import { Persona, PersonaSize } from 'office-ui-fabric-react';
import styles from './Member.module.scss';

const member = (props:any) => (
    <div className={styles.Member}>
        <Persona
            text={props.name}
            imageUrl={props.imageUrl}
            size={PersonaSize.small}
            secondaryText={props.secondaryText}
        />
      </div> 
);


export default member;