import Recat from 'react';
import { Router, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Add } from './index';
import { ToDoListProvider } from 'Contexts';

describe('<Add />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/add');

    const { container } = render(
      <Router history={history}>
        <Add />
      </Router>,
    );

    const input = screen.getByPlaceholderText('할 일을 입력해주세요');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('add a new ToDo add redirect to the root page', () => {
    const history = createMemoryHistory();
    history.push('/add');

    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <ToDoListProvider>
          <div>{pathname}</div>
          <Add />
        </ToDoListProvider>
      );
    };

    render(
      <Router history={history}>
        <TestComponent />
      </Router>,
    );

    const pathName = screen.getByText('/add');
    expect(pathName).toBeInTheDocument();

    const input = screen.getByPlaceholderText('할 일을 입력해주세요');
    const button = screen.getByText('추가');

    fireEvent.change(input, { target: { value: 'New ToDo' } });
    fireEvent.click(button);

    expect(pathName.textContent).toBe('/');
    expect(localStorage.getItem('ToDoList')).toBe('["New ToDo"]');
  });
});
