import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


/**
 2018-03-30T19:44:15.903Z - 2018-03-31T19:44:15.000Z

 */