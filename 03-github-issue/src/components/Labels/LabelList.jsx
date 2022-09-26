import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import LabelHead from "@labels/LabelHead";
import LabelItem from "@labels/LabelItem";
import LabelFetch from "@service/LabelFetch.js";
import { LabelsContext, setLabels } from "@reducer/labelReducer";

const LabelList = () => {
  const { labels, labelsDispatch } = useContext(LabelsContext);

  useEffect(() => {
    const fetchData = async () => {
      const labelList = await LabelFetch.read();
      labelsDispatch(setLabels(labelList));
    };

    fetchData();
  }, [labelsDispatch]);

  const labelList = labels.map((label) => (
    <LabelItem key={label.id} labelData={label} />
  ));

  return (
    <LabelsWrapper>
      <LabelHead labels={labels} />
      <ul>{labelList}</ul>
    </LabelsWrapper>
  );
};

const LabelsWrapper = styled.div`
  margin-top: 1em;
  border: 2px solid #f1f3f5;
`;

export default LabelList;
