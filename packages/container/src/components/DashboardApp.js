import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

export default () => {
    const dashboardAppRef = useRef(null);

    useEffect(() => {
        mount(dashboardAppRef.current);
    }, []) // only run this once when the component is rendered to the screen

    return <div ref={dashboardAppRef} />
}