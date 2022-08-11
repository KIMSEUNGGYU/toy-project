import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import { Form, Label, Input, LinkContainer, Button, Header, Error, Success } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  // [💡 GYU] swr 에서 data가 존재하지 않으면 로딩중
  const { data, error } = useSWR('/api/users', fetcher);
  const [loginError, setLoginError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setLoginError(false);
      axios
        .post('/api/users/login', {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error.response);
          setLoginError(true);
        })
        .finally(() => {});
    },
    [email, password],
  );

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
