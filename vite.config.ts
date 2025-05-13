import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://port-0-shark-be-malwffti7d28a24e.sel4.cloudtype.app/api/user-info/관리자A', // 백엔드 서버 주소
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // '/api' 제거
      }
    }
  }
});
