import React, { FC, useCallback } from 'react';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';

import fetcher from '@utils/fetcher';
import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';

// [💡 GYU]
// FC 타입은 children 사용하는 컴포넌트
// VFC 타입은 children 사용하지 않는 컴포넌트
const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher, {
    // 💡 100초 동안 캐시, 그래서 다른 곳에서 해당 작업이 있더라도 캐시 기간동안은 캐시값을 읽어 서버에 무리를 최소화
    // 실시간 데이터시,  dedupingInterval 의 시간을 줄이면 됨!
    dedupingInterval: 100000,
  });

  const onLogout = useCallback(() => {
    axios //
      .post('http://localhost:3095/api/users/logout', null, { withCredentials: true })
      .then(() => {
        mutate(false);
      });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header>
        <ProfileImg //
          src={gravatar.url(data.nick, { s: '28px', d: 'retro' })}
          alt={data.nickname}
        />
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>Chatgs</Chats>
      </WorkspaceWrapper>
      {children}
    </>
  );
};

export default Workspace;
