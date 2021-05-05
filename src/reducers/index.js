import cart from './mycart';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    myCart: cart
});

export default rootReducer;