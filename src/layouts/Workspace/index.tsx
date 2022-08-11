import React, { useCallback, useState, VFC } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

import fetcher from '@utils/fetcher';
import {
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import Menu from '@components/Menu';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

// [💡 GYU]
// FC 타입은 children 사용하는 컴포넌트
// VFC 타입은 children 사용하지 않는 컴포넌트
const Workspace: VFC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.nick, { s: '28px', d: 'retro' })} alt={data.nickname} />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(data.nick, { s: '36px', d: 'retro' })} alt={data.nickname} />
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
    </>
  );
};

export default Workspace;
