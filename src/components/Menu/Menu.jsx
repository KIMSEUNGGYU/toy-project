import React from "react";
import styled from "styled-components";

const Menu = ({ menu, setMenu, openLabelForm }) => {
  const handleClick = (name) => () => setMenu(name);

  return (
    <MenuWrapper>
      <div>
        <button
          className={menu === "labels" ? "active" : ""}
          onClick={handleClick("labels")}
        >
          Labels
        </button>
        <button
          className={menu === "milestones" ? "active" : ""}
          onClick={handleClick("milestones")}
        >
          Milestones
        </button>
      </div>
      {menu === "labels" ? (
        <AddBtn onClick={openLabelForm}>New Label</AddBtn>
      ) : (
        <AddBtn>New milestone</AddBtn>
      )}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    border: 1px solid rgb(241, 243, 245);
  }

  & div > button {
    width: 100px;
    padding: 0.5em;
    cursor: pointer;
  }

  & button.active {
    background-color: rgb(0, 0, 255, 0.9);
    color: white;
  }
`;

const AddBtn = styled.button`
  border: 1px solid rgb(241, 243, 245);
  background-color: #04b404;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  padding: 1em;
  cursor: pointer;
`;

export default Menu;
