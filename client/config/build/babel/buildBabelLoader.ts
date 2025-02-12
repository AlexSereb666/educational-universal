import {BuildOptions} from "../types/types";
import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";
import babelRemovePropsPlugin from "./babelRemovePropsPlugin";

interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean;
}

export function buildBabelLoader({mode, isTsx}: BuildBabelLoaderProps) {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins = [
        [
            '@babel/plugin-transform-typescript',
            {
                isTsx,
            }
        ],
        '@babel/plugin-transform-runtime',
    ];

    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testId']
            }
        ] as any);

        if (isTsx) {
            plugins.push([
                babelRemovePropsPlugin,
                {
                    props: ['data-testId'],
                }
            ] as any);
        }
    }

    return {
        test: isTsx ? /\.(jsx|tsx)?$/ : /\.(js|ts)?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    "@babel/preset-typescript",
                    ["@babel/preset-react", {
                        runtime: isDev ? 'automatic' : 'classic'
                    }]
                ],
                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}
