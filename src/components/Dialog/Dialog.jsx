import React, { useContext } from "react";
import styled from "styled-components";

import { LabelsContext, deleteLabel } from "@reducer/labelReducer";
import labelFetcher from "@service/LabelFetch";

function Dialog({ title = "Title", label, isDialog, setIsDialog }) {
  const { labelsDispatch } = useContext(LabelsContext);

  if (!isDialog) return null;

  const onCancel = () => {
    setIsDialog(false);
  };

  const onConfirm = async () => {
    try {
      const response = await labelFetcher.delete(label.id);
      if (response.ok) {
        labelsDispatch(deleteLabel(label.id));
      }
    } catch (error) {
      console.error(`Delete Label Error: ${error}`);
    }
  };

  return (
    <DarkBackground>
      <DialogBlock>
        <h3>{title}</h3>
        <ButtonGroup>
          <Button onClick={onCancel}>취소</Button>
          <Button onClick={onConfirm}>확인</Button>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  cursor: pointer;

  &:hover {
    color: grey;
  }
  & + & {
    margin-left: 0.5rem;
  }
`;

export default Dialog;
