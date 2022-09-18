import React, { lazy, Suspense, useState } from 'react'; //lazy loading sub-apps
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/Header';
import Progress from './components/Progress'

const generateClassName = createGenerateClassName({
    productionPrefix:'co',
});

const MarketingLazy = lazy (() => import('./components/MarketingApp'));
const AuthLazy = lazy (() => import('./components/AuthApp'));

export default () => {
    const [isSingnedIn, setIsSignedIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSingnedIn} />
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};