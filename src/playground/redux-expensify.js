import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';
//
//Expenses Reducer
//

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const expensesRecuderDefaultState = [];

const expensesReducer = (state = expensesRecuderDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state, //Spread out the current array
                action.expense //new expense
            ];//return a new arry without change the state object
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id)
                    return {
                        ...expense, //Spread out all expense's properties
                        ...action.updates //overide the expense's properties with new values
                    } //retur a new object with the new updated properties values
                else
                    return expense
            })
        default:
            return state;
    }
};

//
//Filter Reducer
//

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
});

// SET_END_DATE
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
});


const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER': 
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state
    }
}

// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') 
            return a.createdAt < b.createdAt ? 1 : -1;
        else if(sortBy === 'amount')
            return a.amount < b.amount ? 1 : -1;
    });
};


//Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});



const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffe', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter('cdsa'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

//store.dispatch(setStartDate(0));

//store.dispatch(setEndDate(1000));
// store.dispatch(setEndDate());


const demoState = {
    expense: [{
        id: 'fjajsfldas',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};