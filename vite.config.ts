import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // 这一步至关重要：将构建环境中的 API_KEY 注入到前端代码中
      // 注意：在生产环境（客户端）暴露 API Key 有一定风险，请确保已在 Google Cloud Console 限制该 Key 的 Referrer
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env': {} // 防止代码中直接调用 process.env 报错
    },
  };
});