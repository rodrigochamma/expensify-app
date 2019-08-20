const path = require('path')

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        //Basic configurations
        entry: './src/app.js',
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
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',    
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    };
};