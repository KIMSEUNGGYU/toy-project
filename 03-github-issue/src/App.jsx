import styled from "styled-components";
import { useReducer, useState } from "react";

import Header from "@header/Header";
import Menu from "@menu/Menu";
import Labels from "@labels/Labels";
import Milestones from "@milestones/Milestones";

import labelsReducer, {
  LabelsContext,
  initialLabels,
} from "@reducer/labelReducer";

function App() {
  const [menu, setMenu] = useState("milestones");
  const [isNewForm, setIsNewForm] = useState(false);

  const hiddenLabelForm = () => setIsNewForm(false);
  const openLabelForm = () => setIsNewForm(true);

  const [labels, labelsDispatch] = useReducer(labelsReducer, initialLabels);

  return (
    <>
      <Header />
      <MainWrapper>
        <Menu menu={menu} setMenu={setMenu} openLabelForm={openLabelForm} />

        {menu === "labels" ? (
          <LabelsContext.Provider value={{ labels, labelsDispatch }}>
            <Labels isNewForm={isNewForm} hiddenLabelForm={hiddenLabelForm} />
          </LabelsContext.Provider>
        ) : (
          <Milestones />
        )}
      </MainWrapper>
    </>
  );
}

const MainWrapper = styled.div`
  margin: 1em;
  padding: 1em;
`;

export default App;
