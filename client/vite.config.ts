import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'entities': path.resolve(__dirname, 'src/entities'),
            'shared': path.resolve(__dirname, 'src/shared'),
            'pages': path.resolve(__dirname, 'src/pages'),
            'widgets': path.resolve(__dirname, 'src/widgets'),
            'app': path.resolve(__dirname, 'src/app'),
            'features': path.resolve(__dirname, 'src/features'),
        }
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
    }
})
