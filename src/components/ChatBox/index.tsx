import { ChatArea, Form, MentionsTextarea, SendButton, Toolbox, EachMention } from '@components/ChatBox/styles';
import { IUser } from '@typings/db';
// import autosize from 'autosize';
import gravatar from 'gravatar';
import React, { useCallback, useEffect, useRef, VFC } from 'react';
// import { Mention, SuggestionDataItem } from 'react-mentions';

interface Props {
  //   onSubmitForm: (e: any) => void;
  chat?: string;
  //   onChangeChat: (e: any) => void;
  //   placeholder: string;
  //   data?: IUser[];
}
// const ChatBox: VFC<Props> = ({ onSubmitForm, chat, onChangeChat, placeholder, data }) => {
const ChatBox: VFC<Props> = ({ chat }) => {
  const onSubmitForm = useCallback(() => {}, []);

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <textarea />
        {/* <MentionsTextarea
          id="editor-chat"
          value={chat}
          onChange={onChangeChat}
          onKeyPress={onKeydownChat}
          placeholder={placeholder}
          inputRef={textareaRef}
          allowSuggestionsAboveCursor
        > */}
        {/* <Mention
            appendSpaceOnAdd
            trigger="@"
            data={data?.map((v) => ({ id: v.id, display: v.nickname })) || []}
            renderSuggestion={renderUserSuggestion}
          /> */}
        {/* </MentionsTextarea> */}
        <Toolbox>
          <SendButton
            className={
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
              (chat?.trim() ? '' : ' c-texty_input__button--disabled')
            }
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!chat?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
