import authReducer from '../../reducers/auth'


test('Should set default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('Should set uid for login', () => {
    const uid = 'asdkjh98adsj';
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer(undefined, action);
    expect(state).toEqual({ uid });    
});

test('Should clean uid for logout', () => {
    const uid = 'asdkjh98adsj';
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid }, action);
    expect(state).toEqual({});    
});