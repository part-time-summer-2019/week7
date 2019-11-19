import React from 'react';

import Aux from '../../hoc/Auxilary/Aux';
import './Layout.css';
import ToolBar from '../../components/ToolBar/ToolBar';

const layout = (props) => (
    <Aux>
        <ToolBar/>
        <main className="Content">
            {props.children}
        </main>
    </Aux>
);

export default layout;