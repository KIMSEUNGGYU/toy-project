import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = ({ target }) => {
    const { value, name } = target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }

    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');

      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('localStorage is not wroking');
      }
    }
  }, [history, user]);
  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);

/*

try {
  localStorage.setItem('user', JSON.stringify(user));
} catch (error) {
  console.error('localStorage is not wroking');
}

해당 기능(로그인 상태를 유지하기 위한 기능)을 useEffect 나 componentDidMount 메서드에서 처리해도됨
하지만 여기서는 index.js 에서 처리
why?
componentDidMount, useEffect 는 한 번 렌더링된 이후에 실행되기 때문에
사용자가 아주 짧은 깜박임 현상(로그인이 나타나거나 로그아웃이 나타나는 현상)을 경험할 수 있으.
index.js 에서 사용자 정보를 불러오도록 처리하고 컴포넌트를 렌더링하면 이런 깜박임 현상 발생하지 않음.

  
*/
