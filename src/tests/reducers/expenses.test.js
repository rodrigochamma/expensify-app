import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'
import moment from 'moment'


test('Should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});


test('Should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE', 
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0],expenses[2]]);
});


test('Should not remove expense by id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE', 
        id: '-1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
    const expense = {
        id: '4',
        description: 'Expense to add',
        note: '',
        amount: 123,
        createdAt: moment(0)
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('Should edit an expense', () => {
    const amount = 3127381287;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);        
    expect(state[0].amount).toBe(amount);
});


test('Should not edit expense if expense not found', () => {
    const amount = 3127381287;
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);    
    expect(state).toEqual(expenses);
});