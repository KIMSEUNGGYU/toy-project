import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/login/login';
import Maker from './components/maker/maker';
import styles from './app.module.css';

function App({ FileInput, authService }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Login authService={authService} />
          </Route>
          <Route exact path='/maker'>
            <Maker FileInput={FileInput} authService={authService} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
