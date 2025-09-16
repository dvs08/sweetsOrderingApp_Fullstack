const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/', 
                    publicPath: 'images/'  
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
      },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port:3001,

        historyApiFallback: true // This will serve index.html for all routes
    },
    plugins: [
      new HtmlWebpack({
         template: './public/index.html',
         inject: true,                            //automatically injects the bundled js file into the html. Therefore no need to explicitly add the bundle.js file
         filename: 'index.html'
       }),
    ],
    mode: "development"
};



/**
 
CRItical Rendering path: How JS, HTML, css are rendered onto the screen.

1) DOM Tree creation
2) CSS OM tree creation: Block rendeing. Jab tak doosri file nahi aayegi pheli ko render nhi karenge. Will not render untill all css files have loaded. It's over writeable. The tree has only those elmenys where style is used. Eg, Div, Body. etc.
3) JS Script tag is  parser blocking. It will load and render the file as it is loaded. Render is not blocked. eg) if scrip 1 says change to yellow, it wil change to yellow. Then script 2 says change to red, it will change to red.


Now 3) Join DOM and CSSOM to created a render tree. Using Tree Data SCrutruee.

Render Tree: Only elements will be on the tree whcih is to be shown on screen
 */