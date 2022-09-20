import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    // 사용자 아이디가 있을 때만 sync 함
    if (!userId) {
      return;
    }

    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });

    // useEffect 에서 return 은 컴포넌트가 언마운트 됐을 때를 의미
    return () => stopSync();
  }, [userId, cardRepository]); // userId 가 업데이트 될 때마다

  // login 과 관련된 useEffect
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        // 사용자 있다면 userId 를 지정
        setUserId(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [authService, history]);

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
