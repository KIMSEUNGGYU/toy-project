import React, { FC, useCallback } from 'react';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import axios from 'axios';

import fetcher from '@utils/fetcher';

// [💡 GYU]
// FC 타입은 children 사용하는 컴포넌트
// VFC 타입은 children 사용하지 않는 컴포넌트
const Workspace: FC = ({ children }) => {
  const { data, error, revalidate } = useSWR('/api/users', fetcher, { dedupingInterval: 100000 });

  const onLogout = useCallback(() => {
    axios //
      .post('http://localhost:3095/api/users/logout', null, { withCredentials: true })
      .then(() => {
        revalidate();
      });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </>
  );
};

export default Workspace;
