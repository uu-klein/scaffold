import {actionTypes} from '../action';

const defaultState = {
    navMenu: 0,
    account: '',
    userInfo:{
        account: '未绑定账号',
        invitationCode: '',
        isBind: false,
        invitation: 0,
        isInvitation: false,
    },
};

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case actionTypes.CHANGE_MENU:
            return {
                ...state,
                navMenu: action.navMenu
            };
        case actionTypes.CHANGE_ACCOUNT:
            return {
                ...state,
                account: action.account
            };
        case actionTypes.CHANGE_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo
            };
        default:
            return state;
    }
}
