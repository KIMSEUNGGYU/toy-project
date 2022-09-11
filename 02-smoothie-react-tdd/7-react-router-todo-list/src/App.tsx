import Styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { ToDoListProvider } from 'Contexts';
import { List, Add, Detail, NotFound } from 'Pages';
import { PageHeader } from 'Components/PageHeader';

function App() {
  return (
    <ToDoListProvider>
      <Container>
        <PageHeader />
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </ToDoListProvider>
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
