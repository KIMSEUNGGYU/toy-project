import React, { CSSProperties, FC, useCallback } from 'react';

import { CloseModalButton, CreateMenu } from './styles';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton = true }) => {
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
