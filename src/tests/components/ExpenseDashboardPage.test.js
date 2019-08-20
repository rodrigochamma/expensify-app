import React from 'react';
import {shallow} from 'enzyme';
import ExpenseDashboarderPage from '../../components/ExpenseDashboarderPage';

test('Should render ExpenseDashboardPage correctly', () => {
    const weapper = shallow(<ExpenseDashboarderPage />);
    expect(weapper).toMatchSnapshot();
});