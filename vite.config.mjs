// https://github.com/vitejs/vite/discussions/3448
// import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
  // base: '/free',
  define: {
    global: 'window'
  },
  resolve: {
    // alias: [
    //   {
    //     find: /^~(.+)/,
    //     replacement: path.join(process.cwd(), 'node_modules/$1')
    //   },
    //   {
    //     find: /^src(.+)/,
    //     replacement: path.join(process.cwd(), 'src/$1')
    //   }
    // ]
  },
  server: {
    host: '0.0.0.0',
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 8082
    port: 8082
  },
  preview: {
    host: '0.0.0.0',
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 8082
    port: 8082
  }
});
