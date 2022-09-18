import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default ({onSignIn}) => {
    const authAppRef = useRef(null);
    const history = useHistory(); // copy of our browser routing history in the container app

    useEffect(() => {
        const { onParentNavigate } = mount(authAppRef.current, { //onParentNavigate is defined in the bootstrap.js of Marketing app
            initialPath: history.location.pathname, //we did a setup in the bootstrap.js for this 
            onNavigate: ({pathname: nextPathname}) => { // location object has pathname property, also we are renaming pathname to nextPathname
                const { pathname } = history.location;

                if(pathname !== nextPathname){ // we need this check to avoid infinite loop of redirecting
                    history.push(nextPathname);
                }
            },
            onSignIn,
        });

        history.listen(onParentNavigate);
    }, []) // only run this once when the component is rendered to the screen

    return <div ref={authAppRef} />
}