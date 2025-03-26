import * as path from 'path';
import * as webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildPaths } from './config/build/types/types';

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean;
    apiUrl: string;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    };

    const config: webpack.Configuration = buildWebpack({
        port: env?.port ?? 3000,
        mode: env?.mode ?? 'development',
        paths,
        analyzer: env?.analyzer,
        apiUrl: env?.apiUrl || 'http://localhost:8000',
    });

    return config;
};
