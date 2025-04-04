import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    include: /\.[jt]sx?$/,
    exclude: [],
    loader: 'jsx',
  },
  resolve: {
    extensions: [ '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json' ]
  }
})
