import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import {useHistory, useLocation} from "react-router-dom";

import routers from "@/root/config";

import store from "@/redux/store";

const useStyles = makeStyles({
    bottomNavContainer: {
        width: '100vw',
        height: 49,
        // boxShadow: '0px -1px 0px 0px #6B4C2F',
        boxShadow: 'none',
        borderTop: '1px solid #85765a',
        backgroundColor: '#2F1C0B',
        '& span': {
            // color: '',
            fontSize: 12,
            fontFamily: 'PingFang SC',
            marginTop: 4,
        },
        '& button': {
            borderRight: '1px solid #85765a',
            borderTop: 'none',
        },
        '& button:last-child': {
            borderRight: 'none',
        }

    },
    iconContainer: {
        height: 17,
        width: 17,
        '& img': {
            height: 'auto',
            width: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
        }
    },
    selected: {
        backgroundColor: '#1B1006',
        borderTop: '1px solid #85765a',
    },
    selectedColor: {
        color: '#F6BF41',
    },
    notSelectedColor: {
        color: '#fce9b4',
    }
});

const navList = [
    {
        key: 'home',
        root: '/',
        name: '首页',
    },
];

const App: React.FC<{}> = () => {
    const classes = useStyles();

    const location = useLocation();

    const [_value, setValue] = React.useState(store.getState().navMenu);

    React.useEffect(() => {
        const _store = () => store.subscribe(() => {
            setValue(store.getState().navMenu);
        });
        _store();
        const _routers = () => routers.find((router: any) => {
            if (router.path === location.pathname) {
                store.dispatch({type: 'CHANGE_MENU', navMenu: router.appValue})
            }
        });
        _routers();
    }, ['', location]);

    const history = useHistory();

    const changeRoot = (path: string) => {
        history.push(path);
    };

    return (
        <>
            <BottomNavigation
                value={_value}
                onChange={(event, newValue) => {
                    store.dispatch({type: 'CHANGE_MENU', navMenu: newValue});
                    setValue(newValue);
                }}
                showLabels
                className={classes.bottomNavContainer}
            >
                {
                    navList.map((value, index) => {
                        return (
                            <BottomNavigationAction
                                key={index}
                                className={index === _value ? classes.selected : ''}
                                onClick={() => changeRoot(navList[index].root)}
                                label={
                                    <span
                                        className={
                                            index === _value ?
                                                classes.selectedColor : classes.notSelectedColor
                                        }
                                    >{navList[index].name}</span>
                                }
                                icon={
                                    <div key={navList[index].key} className={classes.iconContainer}>
                                        {/*{*/}
                                        {/*    index === _value ?*/}
                                        {/*        <img src={navList[index].selectedImg} alt={''}/>*/}
                                        {/*        : <img src={navList[index].img} alt={''}/>*/}

                                        {/*}*/}
                                    </div>
                                }/>
                        )
                    })
                }
            </BottomNavigation>
        </>
    );
};

export default App;


