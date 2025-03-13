import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration } from 'webpack';
import {BuildOptions} from "./types/types";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): Configuration['module']['rules'] {
    const isDev = options.mode === 'development';

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: [
                    {
                        name: 'convertColors',
                        params: {
                            currentColor: true,
                        }
                    }
                ]
            }
        }],
    };

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[paths][name]__[local]' : '[hash:base64:8]'
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    const codeBabelLoader = buildBabelLoader({...options, isTsx: false});
    const tsxCodeBabelLoader = buildBabelLoader({...options, isTsx: true});

    return [
        assetLoader,
        scssLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
    ]
}
