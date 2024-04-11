import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compileTime from 'vite-plugin-compile-time'

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), compileTime()],
})
