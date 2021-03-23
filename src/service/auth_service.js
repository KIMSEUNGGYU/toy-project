import firebase from "firebase";
import firebaseApp from "./firebase";

// App 에서 수행하는 로그인, 로그아웃 하는 authentication 클래스
class AuthService {
  //provider 에 따라 인증 절차
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();

    // popup 을 이용하기 위해 제공된 코드 사용
    return firebaseApp //
      .auth()
      .signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }
}

export default AuthService;
