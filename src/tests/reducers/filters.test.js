import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('Should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});


test('Should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toEqual('amount');
});

test('Should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = {
        type: 'SORT_BY_DATE'
    };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toEqual('date');
});

test('Should set text fitler', () => {
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'Rent' });
    expect(state.text).toBe('Rent');
});

test('Should set startDate filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', date: moment(0) });
    expect(state.startDate).toEqual(moment(0));
})

test('Should set endDate filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', date: moment(0) });
    expect(state.endDate).toEqual(moment(0));
})