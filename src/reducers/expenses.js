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
        case 'SET_EXPENSES':
            return action.expenses;

        default:
            return state;
    }
};

export default expensesReducer;