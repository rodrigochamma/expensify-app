const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

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
                use: CSSExtract.extract({
                    use: [                        
                        { 
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
                
               
            }]
        },
        plugins: [
            CSSExtract
        ],
        //good tool for help on development.
        devtool: isProduction ? 'source-map' : 'inline-source-map',    
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    };
};