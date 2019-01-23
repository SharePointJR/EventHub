import * as React from 'react';
import MenuBar from '../Navigation/MenuBar/MenuBar';

const chrome = (props:any) => (
    <div>
        <MenuBar />
        <main>
            {props.children}
        </main>
    </div>
);

export default chrome;