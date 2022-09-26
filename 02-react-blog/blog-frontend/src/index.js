import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안함.
    store.dispatch(tempSetUser(JSON.parse(user))); // localStorage 에 사용자 정보가 있다면 사용자 값을 리덕스 스토어에 넣음.
    store.dispatch(check()); // 정말 로그인 상태인지 검증하기 위한 요청
  } catch (error) {
    console.error('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser(); // loadUser 함수가 sagaMiddleware.run 함수보다 먼저 호출하면 CHECK 액션을 디스패치할 때 사가에서 제대로 처리하지 않음.

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
