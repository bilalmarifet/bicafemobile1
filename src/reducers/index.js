import {combineReducers} from 'redux';
import LoginReducers from './LoginReducers';

export default combineReducers({
    LoginResponse:LoginReducers
})