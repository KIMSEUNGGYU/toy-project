import Styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button } from 'Components/Button';

interface Props {
  readonly id: number;
  readonly label: string;
  readonly onDelete?: () => void;
}

export const ToDoItem = ({ id, label, onDelete }: Props) => {
  return (
    <Container>
      <Label to={`/detail/${id}`}>{label}</Label>
      <Button label="삭제" backgroundColor="#FF1744" hoverColor="#F01440" onClick={onDelete} />
    </Container>
  );
};

const Container = Styled.div`
    display: flex;
    border-bottom: 1px solid #BDBDBD;
    align-items: cetner;
    margin: 10px;
    padding: 10px;
`;

const Label = Styled(Link)`
    flex: 1;
    font-size: 16px;
    margin-right: 20px;
    text-decoration: none;
`;
