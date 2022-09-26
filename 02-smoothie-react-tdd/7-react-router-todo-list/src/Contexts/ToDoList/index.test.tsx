import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ToDoListProvider, ToDoListContext } from './index';

beforeEach(() => {
  localStorage.clear();
});

describe('ToDoList Context', () => {
  it('renders component correctly', () => {
    const ChildComponent = () => {
      return <div>Child Component</div>;
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>,
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
    expect(localStorage.getItem('ToDoList')).toBeNull();
  });

  it('loads localStorage data and sets it to State', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    const ChildComponent = () => {
      const { toDoList } = useContext(ToDoListContext);

      return (
        <div>
          {toDoList.map((toDo) => (
            <div key={toDo}>{toDo}</div>
          ))}
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>,
    );

    expect(screen.getByText('ToDo 1')).toBeInTheDocument();
    expect(screen.getByText('ToDo 2')).toBeInTheDocument();
    expect(screen.getByText('ToDo 3')).toBeInTheDocument();
  });

  // 근데 왜 테스트코드 짤 때 기존에 있는 컴포넌트를 사용하지 않고 새로 만들어서(ChildComponent) 테스트 하지?
  it('users addToDo function', () => {
    const ChildComponent = () => {
      const { toDoList, addToDo } = useContext(ToDoListContext);

      return (
        <div>
          <div>
            <div onClick={() => addToDo('study react 1')}>Add ToDo</div>
          </div>
          <div>
            {toDoList.map((toDo) => (
              <div key={toDo}>{toDo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>,
    );

    expect(localStorage.getItem('ToDoList')).toBeNull();
    const button = screen.getByText('Add ToDo');
    fireEvent.click(button);
    expect(screen.getByText('study react 1')).toBeInTheDocument();
    expect(localStorage.getItem('ToDoList')).toBe('["study react 1"]');
  });

  it('users deleteToDo function', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    const ChildComponent = () => {
      const { toDoList, deleteToDo } = useContext(ToDoListContext);

      return (
        <div>
          {toDoList.map((toDo, index) => (
            <div key={toDo} onClick={() => deleteToDo(index)}>
              {toDo}
            </div>
          ))}
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>,
    );

    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem);
    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
  });
});
