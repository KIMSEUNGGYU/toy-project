import React from "react";
import styled from "styled-components";

import MilestoneHeader from "@milestones/MilestoneHeader";
import MilestoneList from "./MilestoneList";

const Milestones = () => {
  return (
    <MilestonesWrapper>
      <MilestoneHeader />
      <MilestoneList />
    </MilestonesWrapper>
  );
};

const MilestonesWrapper = styled.div`
  margin-top: 1em;
  border: 1px solid #e4e4e4;
`;

export default Milestones;
