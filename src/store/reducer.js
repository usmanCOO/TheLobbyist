import { combineReducers } from 'redux';
import currentUser from './reducers/authreducer';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    currentUser: currentUser
});

export default reducer;
