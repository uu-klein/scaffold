import React from 'react';
import {
    BrowserRouter,
    Switch, useLocation,
} from 'react-router-dom';
import App from "@/components/App";
import {makeStyles} from "@material-ui/core/styles";
import RouterGuard from "@/root/routerGuard";
import {Provider} from "react-redux";
import store from "@/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {_persistStore} from '@/redux/store'

const useStyles = makeStyles({
    appNav: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
    }
});

 function Routes() {
    const classes = useStyles();


    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={_persistStore}>
                <BrowserRouter>
                    <Switch>
                        <RouterGuard/>
                    </Switch>
                    <div className={classes.appNav}>
                        <App/>
                    </div>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default Routes



