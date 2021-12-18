import { combineReducers } from 'redux';
import currentOption from './currentOption';
import currentEnteredButton from './currentEnteredButton';
import loginStatus from './loginStatus';

const rootReducer = combineReducers({
    currentOption,
    currentEnteredButton,
    loginStatus,
})

export default rootReducer;