const path = require('path')

module.exports = {
    //Basic configurations
    entry: './src/app.js',
    //entry: './src/playground/redux-expensify.js',
    //entry: './src/playground/hoc.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    //Configuration for babel to process all js files excluding the node_modules directory
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/, 
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    //good tool for help on development.
    devtool: 'cheap-module-eval-source-map',    
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
}
