import React, { useContext, useState } from "react";
import styled from "styled-components";

import { LabelsContext, createLabel } from "@reducer/labelReducer";
import labelFetcher from "@service/LabelFetch";
import { getRandomColor } from "@utils/utils";

const lableInitial = {
  name: "Label preview",
  description: "",
  color: getRandomColor(),
};

const AddLabelForm = ({ visible, hiddenLabelForm }) => {
  const { labelsDispatch } = useContext(LabelsContext);
  const [label, setLabel] = useState(lableInitial);
  const { name, description, color } = label;

  if (!visible) return null;

  const onSetLabelProperty = (key) => ({ target }) => {
    if (key === "color") {
      setLabel({ ...label, color: getRandomColor() });
      return;
    }

    setLabel({ ...label, [key]: target.value });
  };

  const onCreateLabel = async () => {
    if (!name) {
      console.log("Label name 은 필수 값입니다!!");
      return;
    }

    const body = {
      id: Date.now(),
      name,
      description,
      color,
    };

    try {
      const label = await labelFetcher.create(body);
      if (label) {
        labelsDispatch(createLabel(body));
        hiddenLabelForm();
        setLabel(lableInitial);
      }
    } catch (error) {
      console.error(`Create Label Error: ${error}`);
    }
  };

  return (
    <FormWrapper>
      <Preview>
        <Label color={color}>
          <span>{name !== "" ? name : "Label preview"}</span>
        </Label>
      </Preview>
      <AddFormWrapper>
        <FormBox>
          <SubFormBox>
            <label htmlFor="name">Label name</label>
            <Input
              id="name"
              placeholder="Label name"
              onChange={onSetLabelProperty("name")}
            />
          </SubFormBox>
          <SubFormBox>
            <label htmlFor="description">Label description</label>
            <Input
              id="description"
              style={{ width: "600px" }}
              placeholder="Description (optoinal)"
              onChange={onSetLabelProperty("description")}
            />
          </SubFormBox>
          <SubFormBox>
            <label htmlFor="color">color</label>
            <div>
              <RefreshBtn color={color} onClick={onSetLabelProperty("color")}>
                ↻
              </RefreshBtn>
              <Input value={color} readOnly />
            </div>
          </SubFormBox>
        </FormBox>
        <ButtonGroup>
          <CancelBtn onClick={hiddenLabelForm}> Cancel </CancelBtn>
          <CreateBtn onClick={onCreateLabel}>Create label</CreateBtn>
        </ButtonGroup>
      </AddFormWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  margin-top: 1em;
  border: 2px solid #f1f3f5;
  background-color: #f8f9fa;
  padding: 1em;
`;

const Preview = styled.div``;

const AddFormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  width: 30%;
  cursor: pointer;

  & > span {
    padding: 0.3em;
    background-color: ${(props) => (props.color ? props.color : "white")};
    color: black;
    border-radius: 5px;
  }
`;

const FormBox = styled.div`
  display: flex;
`;

const SubFormBox = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  margin-right: 1em;

  & > label {
    font-weight: bold;
  }

  & > div {
    display: flex;
  }
`;

const Input = styled.input`
  padding: 0.5em;
  border: 1px solid #f1f3f5;
`;

const RefreshBtn = styled.button`
  cursor: pointer;
  background-color: ${(props) => (props.color ? props.color : "white")};
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 2em;
`;
const CancelBtn = styled.button`
  border: 1px solid #acacac;
  margin-right: 20px;
  cursor: pointer;
`;
const CreateBtn = styled.button`
  border: 1px solid #acacac;
  background-color: #04b404;
  color: white;
  cursor: pointer;
`;

export default AddLabelForm;
