import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import message from './store/Message';
import dataProvider from './store/DataProvider';
import torrentClient from './store/webtorrent/TorrentClient';

ReactDOM.render(
    <Provider message={message} dataProvider={dataProvider} torrentClient={torrentClient}>
        <App />
    </Provider>
    , 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
