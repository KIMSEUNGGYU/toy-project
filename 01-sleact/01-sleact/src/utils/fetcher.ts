import axios from 'axios';

// [π‘ GYU] - FE μλ²μ λ°± μλ²κ° λ€λ₯Έ κ²½μ° μΏ ν€κ° μ λλ‘ μ λ¬λμ§ μμ, κ·Έλμ withCredential μ΅μμ ν΅ν΄ μ²λ¦¬
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((response) => response.data);

export default fetcher;
