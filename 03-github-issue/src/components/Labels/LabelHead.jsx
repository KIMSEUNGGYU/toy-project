import React from "react";
import styled from "styled-components";

const LabelHead = ({ labels }) => {
  return <Head>{labels.length} lables</Head>;
};

const Head = styled.div`
  background-color: #f8f9fa;
  padding: 1em;
  font-weight: bold;
`;

export default LabelHead;
