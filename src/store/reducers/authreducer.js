import { LOG_IN, LOG_OUT } from 'store/constant';

let userData = JSON.parse(localStorage.getItem('userData'));

let initialState = userData?.status  ? { loggedIn: true, userData: userData } : { loggedIn: false, userData: null };

const currentUser = (state = initialState, action) => {
    //console.log(action)
    console.log('reducers');
    switch (action.type) {
        case LOG_IN:
            console.log('Log in ' + action.payload);
            return {
                ...state,
                userData: action.payload.user,
                loggedIn: true
            };
        case LOG_OUT:
            return {
                ...state,
                userData: null,
                loggedIn: false
            };
        // case "loggedOutAction":
        //     return {
        //         ...state,
        //         user: {},
        //         loggedIn: false
        //     }
        default:
            return state;
    }
};

export default currentUser;
