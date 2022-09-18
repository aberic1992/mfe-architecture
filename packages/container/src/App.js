import React, { lazy, Suspense, useState, useEffect} from 'react'; //lazy loading sub-apps
import { Router, Route, Switch, Redirect} from 'react-router-dom';

import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress'

const generateClassName = createGenerateClassName({
    productionPrefix:'co',
});

const MarketingLazy = lazy (() => import('./components/MarketingApp'));
const AuthLazy = lazy (() => import('./components/AuthApp'));
const DashboardLazy = lazy (() => import('./components/DashboardApp'));

const history = createBrowserHistory(); //We create history because we are not using BrowserRouter

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if(isSignedIn){
            history.push('/dashboard');
        }
    }, [isSignedIn])

    return (
        <Router history={history}> {/* We are using Router instead of BrowserRouter just because its much easier in React to have access to history in the same component if we use Router*/}
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard" >
                                {!isSignedIn && <Redirect  to="/"/>}
                                <DashboardLazy/>
                            </Route>
                            <Route path="/" component={MarketingLazy} /> {/*every other path must be placed about / path*/}
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};