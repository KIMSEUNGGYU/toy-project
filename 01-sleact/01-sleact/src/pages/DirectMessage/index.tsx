import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import useSocket from '@hooks/useSocket';
import { DragOver } from '@pages/Channel/styles';

const PAGE_SIZE = 20;

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const [socket] = useSocket(workspace);
  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  const scrollbarRef = useRef<Scrollbars>(null);

  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
    setSize, // page μ λ³κ²½
  } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );

  const [dragOver, setDragOver] = useState(false);

  // [π‘ GYU] infinite scroll ν  λ μλ 2κ° κ°μ΄ μ¬μ©νλκ² μ’μ
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE); // λ°μ΄ν° λ€ κ°μ Έμλμ§

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      // optimous UI μ μ© chatData
      if (chat.trim() && chatData) {
        const savedChat = chat;

        // (μ΄μ μ μ±ν λ³΄λ΄λ©΄ μ½κ° λλ μ΄μ‘΄μ¬ν΄μ λ³΄μνκΈ° μν΄)
        // [π‘ GYU] mutateChat μΌλ‘ λ¨Όμ  UI λ³κ²½νκ³ 
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

        // λΉλκΈ° μμ²­
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

  const onMessage = useCallback(
    (data: IDM) => {
      if (data.SenderId === Number(id) && myData.id !== Number(id)) {
        mutateChat((chatData) => {
          chatData?.[0].unshift(data);
          return chatData;
        }, false).then(() => {
          if (scrollbarRef.current) {
            // λ΄κ° μ€ν¬λ‘€λ°λ₯Ό 150 μ΄μ μ¬λ ΈμΌλ©΄ μ€ν¬λ‘€λ°λ₯Ό λ°μΌλ‘ μ΄λ
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
            ) {
              console.log('scrollToBottom!', scrollbarRef.current?.getValues());
              setTimeout(() => {
                scrollbarRef.current?.scrollToBottom();
              }, 100);
            }
            // κ·Έ μΈμλ
            // else {
            //   toast.success('μ λ©μμ§κ° λμ°©νμ΅λλ€.', {
            //     onClick() {
            //       scrollbarRef.current?.scrollToBottom();
            //     },
            //     closeOnClick: true,
            //   });
            // }
          }
        });
      }
    },
    [id, myData, mutateChat],
  );

  useEffect(() => {
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('dm', onMessage);
    };
  }, [socket, onMessage]);

  // λ‘λ©μ μ€ν¬λ‘€λ° μ μΌ μλλ‘
  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  useEffect(() => {
    localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
  }, [workspace, id]);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      console.log(e);
      const formData = new FormData();
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + file.name);
            formData.append('image', file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          formData.append('image', e.dataTransfer.files[i]);
        }
      }
      axios.post(`/api/workspaces/${workspace}/dms/${id}/images`, formData).then(() => {
        setDragOver(false);
        localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
        mutateChat();
      });
    },
    [workspace, id, mutateChat],
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    console.log(e);
    setDragOver(true);
  }, []);

  if (!userData || !myData) return null;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container onDrop={onDrop} onDragOver={onDragOver}>
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
      {dragOver && <DragOver>μλ‘λ!</DragOver>}
    </Container>
  );
};

export default DirectMessage;
