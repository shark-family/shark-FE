import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // 백엔드 주소
  withCredentials: false,           // 쿠키 필요 없으면 false
});

export default axiosInstance;