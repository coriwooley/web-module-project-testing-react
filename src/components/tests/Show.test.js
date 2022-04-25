import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const testShowData = {
    name: 'Test Show',
    summary: 'Testing the test show',
    seasons:[
        {
            id: 0,
            name: 'Season 1',
            episodes:[]
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        },
    ]
}

test('renders without errors', () => {
    render(<Show show={testShowData} selectedSeason={'none'}/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>)
    const loading = screen.queryByTestId('loading-container')
    expect(loading).toBeInTheDocument()
    expect(loading).toBeVisible()
    expect(loading).toBeTruthy()
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShowData} selectedSeason={'none'}/>)
    const options = screen.queryAllByTestId('season-option')
    expect(options).toHaveLength(2)
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect =jest.fn()
    render(<Show show={testShowData} selectedSeason={'none'} handleSelect={handleSelect}/>)
    const select = screen.getByRole('combobox')
    userEvent.selectOptions(select, ['0'])
    console.log(select)
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={testShowData} selectedSeason={'none'}/>)
    let episodes = screen.queryByTestId('episodes-container')
    expect(episodes).not.toBeInTheDocument()

    rerender(<Show show={testShowData} selectedSeason={1}/>)
    episodes = screen.queryByTestId('episodes-container')
    expect(episodes).toBeInTheDocument()
});
