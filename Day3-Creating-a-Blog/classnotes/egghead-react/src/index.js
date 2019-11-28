import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppForm from './App-form';
import AppKeyDemo from './App-keydemo';
import AppLifeCycle from './App-lifecycle';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppLifeCycle />, document.getElementById('root'));
// ReactDOM.render(<AppForm />, document.getElementById('root'));
// ReactDOM.render(<AppKeyDemo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
