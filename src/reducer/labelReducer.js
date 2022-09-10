import React from "react";

// 액션 타입 만들기
const SET_LABLES = "SET_LABELS";
const CREATE_LABEL = "CREATE_LABEL";
const UPDATE_LABEL = "UPDATE_LABEL";
const DELETE_LABEL = "DELETE_LABEL";
// const READ_LABELS = "READ_LABELS";

// 액션 생성 함수 만들기
export const setLabels = (labels) => ({ type: SET_LABLES, labels });
export const createLabel = (label) => ({ type: CREATE_LABEL, label });
export const updateLabel = (id, label) => ({ type: UPDATE_LABEL, id, label });
export const deleteLabel = (id) => ({ type: DELETE_LABEL, id });
// export const readLabels = () => ({ type: READ_LABELS });

// 초기 상태 선언
export const initialLabels = [];

// 리듀서
export default function labelsReducer(state = initialLabels, action) {
  switch (action.type) {
    case SET_LABLES:
      return action.labels;
    case CREATE_LABEL:
      return state.concat(action.label);
    case UPDATE_LABEL:
      return state.map((label) =>
        label.id === action.id ? action.label : label
      );
    case DELETE_LABEL:
      return state.filter((label) => label.id !== action.id);
    // case READ_LABELS: // debugging 용
    //   console.log("read", state);
    //   return state;
    default:
      throw new Error();
  }
}

export const LabelsContext = React.createContext();
