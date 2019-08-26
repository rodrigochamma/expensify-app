import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import expensesReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhencers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    //Store creation
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filterReducer
        }),
        composeEnhencers(applyMiddleware(thunk))
    );
    
    return store;
};

