import React from 'react';
import Styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Container = Styled.div``;
const Title = Styled.div``;

const PageHeader = () => {
  const { pathname } = useLocation();

  let title = '에7';
  if (pathname === '/') {
    title = '할 일 목록';
  } else if (pathname === '/add') {
    title = '할 일 추가';
  } else if (pathname === '/detail/1') {
    title = '할 일 상세';
  }

  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default PageHeader;
