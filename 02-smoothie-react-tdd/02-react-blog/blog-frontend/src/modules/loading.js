import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// 액션 생성 함수
export const startLoading = createAction(
  START_LOADING,
  (reqeustType) => reqeustType,
);
export const finishLoading = createAction(
  FINISH_LOADING,
  (reqeustType) => reqeustType,
);

// 초기 값 설정
const initialState = {};

// 리듀서
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
