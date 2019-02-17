import * as React from 'react';

import Member from '../../statelessComponents/Member/Member';
import styles from './Members.module.scss';

class Members extends React.Component<any, any> {
   public state: any = {
        person: [
            {
                name: "Jason Rivera",
                imageUrl: "",
                secondaryText: "SharePoint Architect"
            },
            {
                name: "Adele Vance",
                imageUrl: "",
                secondaryText: "Business Analyst"
            },
            {
                name: "John Doe",
                imageUrl: "",
                secondaryText: "Manager"
            }
        ]
    };

    public render(): React.ReactElement<any> {

        // create a member tag for each person in our state
        let membersList = (
            this.state.person.map(p =>{
                return (
                <Member 
                    name={p.name}
                    imageUrl={p.imageUrl}
                    secondaryText={p.secondaryText} />
                );
            })
        );

        return (
            <div className={styles.Members}>
                {membersList}
            </div>
        );
    }
}

export default Members;