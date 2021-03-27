import React, { memo } from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import AuthService from "./service/auth_service";
import ImageUploader from "./service/image_upload";
import ImageFileInput from "./components/image_file_input/image_file_input";
import CardRepository from "./service/card_repository";

const authService = new AuthService();
const imageUploader = new ImageUploader();
const cardRepository = new CardRepository();
/*
DI란?
- ?
---
const FileInput = <ImageFileInput imageUploader={imageUploader} />
이렇게 안한 이유는 ImageFileInput 에 onClick 이런 것들을 추가할 수가 없음
즉 확장성이 떨어짐

 */

/*
FileInput을 따로 빼는 이유는
FileInput 이라는 것이 다른 서비스나 다른 것들을 인젝트 받으면 두, 세개 전달됨
그래서 연관된 부분을 다 봐야하는데 이렇게 따로 빼 놓으면 수정을 여기에서만 해도됨!
다른 컴포넌트(하위 컴포넌트)에서 변경하지 않아도 됨
*/

const FileInput = memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      FileInput={FileInput}
      cardRepository={cardRepository}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
