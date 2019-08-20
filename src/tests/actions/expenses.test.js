import {addExpense,editExpense,removeExpense} from '../../actions/expenses'

//Remove
test('Should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

//Edit
test('Should setup edit expense action object', () => {
    const action = editExpense('123abc', {
        note: 'New note',
        amount: 12345
    });
    expect(action).toEqual({        
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note',
            amount: 12345
        }
    });
});

//Add
test('Should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('Should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    });
});