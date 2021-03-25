import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: '1',
      name: 'Gyu',
      company: 'Naver',
      theme: 'dark',
      title: 'Software Engineer',
      email: 'gyu@gmail.com',
      message: 'go for it',
      fileName: 'gyu',
      fileURL: null,
    },
    {
      id: '2',
      name: 'Gyu2',
      company: 'Naver',
      theme: 'light',
      title: 'Software Engineer',
      email: 'gyu@gmail.com',
      message: 'go for it',
      fileName: 'gyu',
      fileURL: 'ellie',
    },
    {
      id: '3',
      name: 'Gyu3',
      company: 'Naver',
      theme: 'colorful',
      title: 'Software Engineer',
      email: 'gyu@gmail.com',
      message: 'go for it',
      fileName: 'gyu',
      fileURL: null,
    },
  ]);
  const history = useHistory();

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      !user && history.push('/');
    });
  });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
