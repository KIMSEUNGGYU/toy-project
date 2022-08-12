import React, { useCallback } from 'react';
import useSWR from 'swr';
import gravatar from 'gravatar';

import { Container, Header } from './styles';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { IDM } from '@typings/db';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');

  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
  } = useSWR<IDM[]>(`/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      if (chat.trim()) {
        axios
          .post(
            `/api/workspaces/${workspace}/dms/${id}/chats`, //
            { content: chat },
            { withCredentials: true },
          )
          .then(() => {
            revalidate();
            setChat('');
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },
    [chat],
  );

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
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
        // pla"ceholder={`Message ${userData.nickname}`}
        // data={[]}
      />
      {/* {dragOver && <DragOver>업로드!</DragOver>} */}
    </Container>
  );
};

export default DirectMessage;
