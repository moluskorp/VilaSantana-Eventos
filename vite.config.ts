import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const reactRefresh = require('@vitejs/plugin-react-refresh');
import reactSvgPlugin from 'vite-plugin-react-svg';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), reactRefresh(), reactSvgPlugin()],
});
