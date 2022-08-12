import React from 'react';
import useSWR from 'swr';
import gravatar from 'gravatar';

import { Container, Header } from './styles';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);

  if (!userData || !myData) return null;

  return (
    <Container
    // onDrop={onDrop} onDragOver={onDragOver}
    >
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      {/* <ChatList
        scrollbarRef={scrollbarRef}
        isReachingEnd={isReachingEnd}
        isEmpty={isEmpty}
        chatSections={chatSections}
        setSize={setSize}
      /> */}
      <ChatList />
      <ChatBox
        // onSubmitForm={onSubmitForm}
        // chat={chat}
        // onChangeChat={onChangeChat}
        // pla"ceholder={`Message ${userData.nickname}`}
        // data={[]}
        chat=""
      />
      {/* {dragOver && <DragOver>업로드!</DragOver>} */}
    </Container>
  );
};

export default DirectMessage;
