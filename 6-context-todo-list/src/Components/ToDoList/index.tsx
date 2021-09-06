import React from 'react';
import Styled from 'styled-components';

import { ToDoItem } from 'Components/TodoItem';

interface Props {
  readonly toDoList: string[];
  readonly deleteToDo: (index: number) => void;
}

export const ToDoList = ({ toDoList, deleteToDo }: Props) => {
  return (
    <Container data-testid="toDoList">
      {toDoList.map((item, index) => (
        <ToDoItem key={item} label={item} onDelete={() => deleteToDo(index)} />
      ))}
    </Container>
  );
};

const Container = Styled.div`
    min-width: 350px;
    height: 400px;
    overflow-y: scroll;
    border: 1px solid #BDBDBD;
    margin-bottom: 20px;
`;
