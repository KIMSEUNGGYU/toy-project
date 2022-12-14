import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';

import { Form, Label, Input, LinkContainer, Button, Header, Error, Success } from './styles';
import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';

const SignUp = () => {
  const { data, error, revalidate } = useSWR('/api/users', fetcher, { dedupingInterval: 100000 });

  const [email, onChangeEmail] = useInput('dev.seunggyu@gmail.com');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('12341234');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState(''); // π‘ νλ©΄μ νμνλ λ°μ΄ν°λ state λ‘ λ§λ€κΈ°
  const [signUpSuccess, setSignUpSuccess] = useState(false); // π‘ νλ©΄μ νμνλ λ°μ΄ν°λ state λ‘ λ§λ€κΈ°

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!mismatchError) {
        console.log('μλ²λ‘ νμκ°μνκΈ°', email, nickname, password, passwordCheck);

        // [π‘ GYU] λΉλκΈ° μμ²­μ λ°λΌ μνκ° λ³κ²½(setState)νλ©΄ λΉλκΈ° μμ²­ μ μ μνλ₯Ό μ΄κΈ°ννλκ² μ’μ(setState(''))
        // μλνλ©΄ μμ²­μ μ°λ¬μ λ λ¦΄ λ, μ²«λ²μ§Έ μμ²­μ λ¨μμλ κ²°κ³Όκ° λλ²μ§Έ μμ²­μλ λκ°μ΄ νμλλ μ΄μκ° μμ.
        setSignUpError('');
        setSignUpSuccess(false);
        axios
          .post('/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.error(error.response);
            setSignUpError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  // [π‘ GYU] κΉλΉ‘μ λ°©μ§
  if (data === undefined) {
    return <div>λ‘λ©μ€...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/μΌλ°" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>μ΄λ©μΌ μ£Όμ</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>λλ€μ</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>λΉλ°λ²νΈ</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>λΉλ°λ²νΈ νμΈ</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>λΉλ°λ²νΈκ° μΌμΉνμ§ μμ΅λλ€.</Error>}
          {!nickname && <Error>λλ€μμ μλ ₯ν΄μ£ΌμΈμ.</Error>}
          {signUpError && <Error>μ΄λ―Έ κ°μλ μ΄λ©μΌμλλ€.</Error>}
          {signUpSuccess && <Success>νμκ°μλμμ΅λλ€! λ‘κ·ΈμΈν΄μ£ΌμΈμ.</Success>}
        </Label>
        <Button type="submit">νμκ°μ</Button>
      </Form>
      <LinkContainer>
        μ΄λ―Έ νμμ΄μ κ°μ?&nbsp;
        <Link to="/login">λ‘κ·ΈμΈ νλ¬κ°κΈ°</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
