import React, { useState } from 'react';
import Styled from 'styled-components';

import { Button, Input, ToDoItem } from 'Components';

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
        <ToDoListContainer data-testid="toDoList">
          {toDoList.map((item, index) => (
            <ToDoItem key={item} label={item} onDelete={() => deleteToDo(index)} />
          ))}
        </ToDoListContainer>
        <InputContainer>
          <Input
            placeholder="할 일을 입력해 주세요"
            value={todo}
            onChange={(text) => setTodo(text)}
          />
          <Button label={'추가'} onClick={addToDo} />
        </InputContainer>
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

const InputContainer = Styled.div`
  display: flex;
`;

const ToDoListContainer = Styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #BDBDBD;
  margin-bottom: 20px;
`;
export default App;
