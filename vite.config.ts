import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载所有环境变量 (包括 Cloudflare Pages 设置的)
  // Using '.' instead of process.cwd() prevents "Property 'cwd' does not exist on type 'Process'" error
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // 安全地注入 API Key，如果不存在则注入空字符串，防止构建错误
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // 避免直接重新定义 process 对象，这会导致某些库崩溃
      // 我们只处理我们需要用到的具体变量
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    }
  };
});