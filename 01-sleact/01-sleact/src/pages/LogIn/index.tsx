import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import { Form, Label, Input, LinkContainer, Button, Header, Error, Success } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  // [๐ก GYU] swr ์์ data๊ฐ ์กด์ฌํ์ง ์์ผ๋ฉด ๋ก๋ฉ์ค
  // ๋ด๊ฐ ์ํ  ๋ ํธ์ถํ๊ฒ ํ๋ ๊ฒ์ revalidate() ๋ก ์ ์ด ๊ฐ๋ฅ
  // ์ฃผ๊ธฐ์ ์ผ๋ก ํธ์ถ์ ๋์ง๋ง debupingInterval ๊ธฐ๊ฐ ๋ด์๋ ์บ์์์ ๋ถ๋ฌ์ด (100s)
  const { data, error, revalidate } = useSWR('/api/users', fetcher, { dedupingInterval: 100000 });
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
          revalidate();
        })
        .catch((error) => {
          console.error(error.response);
          setLoginError(true);
        })
        .finally(() => {});
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>๋ก๋ฉ์ค...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/์ผ๋ฐ" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>์ด๋ฉ์ผ ์ฃผ์</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>๋น๋ฐ๋ฒํธ</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {loginError && <Error>์ด๋ฉ์ผ๊ณผ ๋น๋ฐ๋ฒํธ ์กฐํฉ์ด ์ผ์นํ์ง ์์ต๋๋ค.</Error>}
        </Label>
        <Button type="submit">๋ก๊ทธ์ธ</Button>
      </Form>
      <LinkContainer>
        ์์ง ํ์์ด ์๋์ ๊ฐ์?&nbsp;
        <Link to="/signup">ํ์๊ฐ์ ํ๋ฌ๊ฐ๊ธฐ</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
