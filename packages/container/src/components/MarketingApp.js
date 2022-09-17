import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default () => {
    const marketingAppRef = useRef(null);
    const history = useHistory(); // copy of our browser routing history in the container app

    useEffect(() => {
        const { onParentNavigate } = mount(marketingAppRef.current, { //onParentNavigate is defined in the bootstrap.js of Marketing app
            onNavigate: ({pathname: nextPathname}) => { // location object has pathname property, also we are renaming pathname to nextPathname
                const { pathname } = history.location;

                if(pathname !== nextPathname){ // we need this check to avoid infinite loop of redirecting
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onParentNavigate);
    }, []) // only run this once when the component is rendered to the screen

    return <div ref={marketingAppRef} />
}