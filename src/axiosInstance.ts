import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://port-0-shark-be-malwffti7d28a24e.sel4.cloudtype.app', // 백엔드 주소
  withCredentials: false,           // 쿠키 필요 없으면 false
});

export default axiosInstance;