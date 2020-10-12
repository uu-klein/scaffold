import React from 'react';
import {
    Redirect,
    Route,
    useLocation,
} from 'react-router-dom';

import routers from "@/root/config";

//  路由守卫

function RouterGuard() {
    const location = useLocation();

    let {pathname} = location;

    let thisRoute = routers.find((router: any) => router['path'] === pathname);

    return thisRoute !== undefined ?
        <Route path={pathname} component={thisRoute && thisRoute['component']} exact/> :
        <Redirect from="/*" to="/"/>
}

export default RouterGuard

