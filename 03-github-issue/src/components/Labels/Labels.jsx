import React from "react";

import AddLabelForm from "@labels/AddLabelForm";
import LabelList from "@labels/LabelList";

const Labels = ({ isNewForm, hiddenLabelForm }) => {
  return (
    <>
      <AddLabelForm visible={isNewForm} hiddenLabelForm={hiddenLabelForm} />
      <LabelList />
    </>
  );
};

export default Labels;
