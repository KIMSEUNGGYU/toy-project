import styled from "styled-components";

const MilestoneHeader = () => {
  return (
    <Header>
      <ul>
        <li>2 Open</li>
        <li>0 Closed</li>
      </ul>
    </Header>
  );
};

const Header = styled.header`
  background-color: #f8f9fa;
  border: 1px solid #e4e4e4;
  padding: 1em;
  font-weight: bold;

  & > ul {
    display: flex;
  }

  & li {
    margin-right: 1em;
    cursor: pointer;
  }
`;

export default MilestoneHeader;
