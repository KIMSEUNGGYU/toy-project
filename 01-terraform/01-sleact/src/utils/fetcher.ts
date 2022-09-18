import axios from 'axios';

// [💡 GYU] - FE 서버와 백 서버가 다른 경우 쿠키가 제대로 전달되지 않음, 그래서 withCredential 옵션을 통해 처리
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((response) => response.data);

export default fetcher;
