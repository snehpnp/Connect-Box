import MiniCssExtractPlugin = require("mini-css-extract-plugin");
export const mode: string;
export namespace entry {
    const styles: string[];
}
export namespace output {
    const path: string;
    const filename: string;
    const libraryTarget: string;
}
export namespace module {
    const rules: ({
        test: RegExp;
        exclude: RegExp;
        loader: string;
        options: {
            presets: string[];
        };
        use?: undefined;
    } | {
        test: RegExp;
        use: string;
        exclude: RegExp;
        loader?: undefined;
        options?: undefined;
    } | {
        test: RegExp;
        use: (string | {
            loader: string;
        })[];
        exclude?: undefined;
        loader?: undefined;
        options?: undefined;
    })[];
}
export const optimization: {};
export const plugins: MiniCssExtractPlugin[];
