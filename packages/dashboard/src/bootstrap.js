import { createApp} from 'vue';
import Dashboard from './components/Dashboard.vue';

//Mount func to start up the app
const mount = (el) => { // el -> HTML element passed from development or prod/dev or prod/prod
    const app = createApp(Dashboard);
    app.mount(el) // this mount is not related to our mount in 5th line 
}

//if we are in development and in isolation,
//call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root')

    if (devRoot) {
        mount(devRoot); //mount expects second object which is navigate but we are not getting it in the standalone app and we are using browsing history in development mode
    }
}

// Othervise we are assuming we are running through container
// and we should export the mount function 

export { mount };