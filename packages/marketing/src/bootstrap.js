import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

//Mount func to start up the app
const mount = (el) => { // el -> HTML element passed from development or prod/dev or prod/prod
    ReactDOM.render(
        <App />,
        el
    );
}

//if we are in development and in isolation,
//call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root')

    if (devRoot) {
        mount(devRoot);
    }
}


// Othervise we are assuming we are running through container
// and we should export the mount function 

export { mount };