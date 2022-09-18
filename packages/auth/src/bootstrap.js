import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App'

//Mount func to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => { // el -> HTML element passed from development or prod/dev or prod/prod

    const history = defaultHistory || createMemoryHistory({ //We are using this to handle proper routing for MFE architecture, default history is for stand alone app in dev environment
        initialEntries: [initialPath] //initial path is for solving a bug when accessing not root path like /auth/something
    }); 

    if(onNavigate) { // we need this check because we wont get onNavigate if we are starting marketing app as a standalone instead from the container app
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history} />,
        el
    );

    return {  //we return this object so that container can get information from marketing app 
        onParentNavigate({pathname: nextPathname}) { // location object has pathname property it history.listen returns this object this is from Container app
            const { pathname } = history.location;
            if(pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
}

//if we are in development and in isolation,
//call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root')

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() }); //mount expects second object which is navigate but we are not getting it in the standalone app and we are using browsing history in development mode
    }
}


// Othervise we are assuming we are running through container
// and we should export the mount function 

export { mount };