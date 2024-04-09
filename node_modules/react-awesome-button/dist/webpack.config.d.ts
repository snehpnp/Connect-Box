import TerserPlugin = require("terser-webpack-plugin");
export const mode: string;
export namespace entry {
    const index: string[];
}
export namespace output {
    const path: string;
    const filename: string;
    const libraryTarget: string;
    const library: string;
    const globalObject: string;
}
export const externals: {
    react: {
        root: string;
        commonjs2: string;
        commonjs: string;
        amd: string;
    };
    'prop-types': {
        root: string;
        commonjs: string;
        commonjs2: string;
        amd: string;
    };
};
export namespace module {
    const rules: ({
        test: RegExp;
        use: string;
        exclude: RegExp;
        loader?: undefined;
        options?: undefined;
    } | {
        test: RegExp;
        exclude: RegExp;
        loader: string;
        options: {
            presets: string[];
        };
        use?: undefined;
    })[];
}
export namespace resolve {
    const extensions: string[];
}
export namespace optimization {
    const minimize: boolean;
    const minimizer: TerserPlugin<import("terser").MinifyOptions>[];
}
