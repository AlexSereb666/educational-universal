import * as webpack from 'webpack';
import { RuleSetRule } from 'webpack';
import * as path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/types';

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        // @ts-ignore
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    config.resolve.modules.push(paths.src);
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve!.alias = {
        ...config.resolve!.alias,
        '@': paths.src,
    };
     
    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config.module.rules.push(buildCssLoader(true));

    return config;
};