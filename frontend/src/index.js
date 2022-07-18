import React from 'react';
import {render} from 'react-dom';
import Generation from './components/Generation';
import Dragon from './components/Dragon';

import '/index.css' //parcel is doing this asset loading


render(
    <div>
        <h2>DragonStack</h2>
        <Generation />
        <Dragon />
    </div>,
    document.getElementById('root')
);