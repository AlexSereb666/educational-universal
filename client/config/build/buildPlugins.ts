import * as webpack from 'webpack';
import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import * as ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import * as path from "path";
import * as CopyPlugin from "copy-webpack-plugin";
// @ts-ignore
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as CircularDependencyPlugin from 'circular-dependency-plugin';

export function buildPlugins({mode, paths, analyzer, apiUrl}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico')
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            }
        })
    ];

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new ForkTsCheckerWebpackPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }));
        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
            ]
        }));
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}
