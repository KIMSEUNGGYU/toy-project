import React, { useState } from 'react';
import Styled from 'styled-components';

import { InputContainer, ToDoList } from 'Components';

function App() {
  const [todo, setTodo] = useState('');
  const [toDoList, setToDoList] = useState<string[]>([]);

  const addToDo = (): void => {
    if (todo) {
      setToDoList([...toDoList, todo]);
      setTodo('');
    }
  };

  const deleteToDo = (index: number): void => {
    const list = [...toDoList];
    list.splice(index, 1);
    setToDoList(list);
  };

  return (
    <Container>
      <Contents>
        <ToDoList toDoList={toDoList} deleteToDo={deleteToDo} />
        <InputContainer toDo={todo} onChange={(text) => setTodo(text)} onAdd={addToDo} />
      </Contents>
    </Container>
  );
}

const Container = Styled.div`
  min-height: 100vh;
  display: flex;
  align-items: cetner;
  justify-content: center;
  flex-direction: column;
`;

const Contents = Styled.div`
  display: flex;
  background-color: #FFFFFF;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .2)
`;

export default App;
