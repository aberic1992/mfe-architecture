import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';


export default () => {
    const marketingAppRef = useRef(null);

    useEffect(() => {
        mount(marketingAppRef.current)
    })

    return <div ref={marketingAppRef} />
}