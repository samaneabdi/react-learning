import { combineReducers } from 'redux';

import catSlice from './catSlice'
import productSlice from './productSlice';


const rootReducer = combineReducers({
    cat: catSlice,
    product: productSlice
});

export default rootReducer;