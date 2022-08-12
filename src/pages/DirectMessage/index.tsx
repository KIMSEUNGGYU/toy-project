import React, { useCallback, useEffect, useRef } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import gravatar from 'gravatar';
import { Scrollbars } from 'react-custom-scrollbars';

import { Container, Header } from './styles';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { IDM } from '@typings/db';
import makeSection from '@utils/makeSection';

const PAGE_SIZE = 20;

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  const scrollbarRef = useRef<Scrollbars>(null);

  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
    setSize, // page 수 변경
  } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );

  // [💡 GYU] infinite scroll 할 때 아래 2개 같이 사용하는게 좋음
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE); // 데이터 다 가져왔는지

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      // optimous UI 적용 chatData
      if (chat.trim() && chatData) {
        const savedChat = chat;

        // (이전엔 채팅 보내면 약간 딜레이존재해서 보완하기 위해)
        // [💡 GYU] mutateChat 으로 먼저 UI 변경하고
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            SenderId: myData.id,
            Sender: myData,
            ReceiverId: userData.id,
            Receiver: userData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scrollbarRef.current?.scrollToBottom();
        });

        // 비동기 요청
        axios
          .post(
            `/api/workspaces/${workspace}/dms/${id}/chats`, //
            { content: chat },
            { withCredentials: true },
          )
          .then(() => {
            revalidate();
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },
    [chat, chatData, myData, userData, workspace, id],
  );

  // 로딩시 스크롤바 제일 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  useEffect(() => {
    localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
  }, [workspace, id]);

  if (!userData || !myData) return null;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container
    // onDrop={onDrop} onDragOver={onDragOver}
    >
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList
        // scrollbarRef={scrollbarRef}
        isReachingEnd={isReachingEnd}
        isEmpty={isEmpty}
        chatSections={chatSections}
        ref={scrollbarRef}
        setSize={setSize}
      />
      {/* <ChatList chatSections={chatSections}  /> */}
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
