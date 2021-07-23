const webpack = require("webpack");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: [/\.s[ac]ss$/i, /\.css$/i],
                use: ["style-loader", "css-loader", "sass-loader"]
            },
        ]
    },
    output: {
        filename: "[name].js",
        sourceMapFilename: "[name].js.map"
    },
    devtool: "source-map",

    plugins: [
        new webpack.ExternalsPlugin('commonjs', [
            'electron',
            'child_process',
            'sqlite3',
        ])
    ]
};
