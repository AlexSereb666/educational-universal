import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";
import * as path from "path";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        mainFiles: ['index'],
        alias: {
            '@': options.paths.src,
        },
        modules: [
            path.resolve(__dirname, options.paths.src),
            "node_modules",
        ],
    }
}
