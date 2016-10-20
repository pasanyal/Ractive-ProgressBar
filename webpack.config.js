/* Webpack configurations to bundle the application modules,
the compiled and compressed js file is generated in /dist/js/app-bundle.min.js,
css file is generated in /dist/css/styles.min.css
*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {  
    entry: './app/js/app.js',
    devtool: 'source-map',
    output: {
        path: './dist',
        filename: '/js/app-bundle.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            { 
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract(
                    /* activate source maps via loader query */
                    'css?sourceMap!' +
                    'sass?sourceMap'
                )
            },
			{
				test: /\.html$/,
				loader: 'raw'
			}
        ]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new ExtractTextPlugin("/css/styles.min.css", {allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};