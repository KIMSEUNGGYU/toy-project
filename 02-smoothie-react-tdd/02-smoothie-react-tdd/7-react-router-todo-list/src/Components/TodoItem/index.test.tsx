import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import { ToDoItem } from './index';

describe('<ToDoItem />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <Router>
        <ToDoItem id={1} label="default value" />
      </Router>,
    );

    const todoItem = screen.getByText('default value');
    expect(todoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('clicks the delete button', () => {
    const handleClick = jest.fn();
    render(
      <Router>
        <ToDoItem id={1} label="default value" onDelete={handleClick} />
      </Router>,
    );

    const deleteButton = screen.getByText('삭제');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(deleteButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('clicks the link', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();

      return (
        <div>
          <div>{pathname}</div>
          <ToDoItem id={1} label="default value" />
        </div>
      );
    };

    render(
      <Router>
        <TestComponent />
      </Router>,
    );

    const pathName = screen.getByText('/');
    expect(pathName).toBeInTheDocument();
    const toDoItem = screen.getByText('default value');
    fireEvent.click(toDoItem);
    expect(pathName.textContent).toBe('/detail/1');
  });
});
