import { firebaseAuth, githubProvider, googleProvider } from "./firebase";

// App 에서 수행하는 로그인, 로그아웃 하는 authentication 클래스
class AuthService {
  //provider 에 따라 인증 절차
  login(providerName) {
    const authProvider = this.getProvider(providerName);

    // popup 을 이용하기 위해 제공된 코드 사용
    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return googleProvider;
      case "Github":
        return githubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
