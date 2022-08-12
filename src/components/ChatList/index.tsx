import React, { useCallback, VFC, forwardRef, ForwardedRef, MutableRefObject } from 'react';

import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IChat, IDM } from '@typings/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  // scrollbarRef: RefObject<Scrollbars>;
  isReachingEnd?: boolean;
  isEmpty: boolean;
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
}

const ChatList = forwardRef<Scrollbars, Props>(
  ({ chatSections, setSize, isEmpty, isReachingEnd }, ref: ForwardedRef<Scrollbars>) => {
    const onScroll = useCallback(
      (values) => {
        // values.scrollTop === 0 (가장위) && 마지막이 아니고, 비어있지 않으면
        if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
          setSize((size) => size + 1).then(() => {
            const current = (ref as MutableRefObject<Scrollbars>)?.current;

            // 위치 수정 (지금 현재 스크롤바 위치에서 - 현재 스크롤바 높이 => 해당 식이 이어서 보여주는 로직)
            if (current) {
              current.scrollTop(current?.getScrollHeight() - values.scrollHeight);
            }
          });
        }
      },
      [setSize, isReachingEnd, isEmpty, ref],
      // [setSize, scrollbarRef, isReachingEnd, isEmpty],
    );

    // const onScroll = useCallback((values) => {
    //   if (values.scrollTop === 0) {
    //     console.log('가장 위');
    //   }
    // }, []);

    return (
      <ChatZone>
        <Scrollbars autoHide ref={ref} onScrollFrame={onScroll}>
          {Object.entries(chatSections).map(([date, chats]) => {
            return (
              <Section className={`section-${date}`} key={date}>
                <StickyHeader>
                  <button>{date}</button>
                </StickyHeader>
                {chats.map((chat) => (
                  <Chat key={chat.id} data={chat} />
                ))}
              </Section>
            );
          })}
        </Scrollbars>
      </ChatZone>
    );
  },
);

export default ChatList;
