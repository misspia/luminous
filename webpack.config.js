const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');
const TEMPLATE_PATH = path.resolve(ROOT_PATH, 'index.html');
const ENTRY_PATH = path.resolve(ROOT_PATH, 'src/index.js');


module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: ENTRY_PATH,
	output: {
		filename: 'bundle.js',
		path: OUTPUT_PATH,
		publicPath: 'dist/'
	},
	plugins: [
	new HtmlWebpackPlugin({
		title: 'Luminous',
		filename: TEMPLATE_PATH,
		inject: 'body'
	})
	],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
			'jshint-loader',
			{
				loader: 'babel-loader',
				options: {
					presets: [
					['es2015', { modules: false }]
					]
				}
			}
			]
		},
		{
			test: /\.scss$/,
			use: [
			'style-loader',
			'css-loader',
			'sass-loader'
			]
		},
		{
			test: /\.(glsl|vert|frag)$/,
			loader: 'webpack-glsl-loader'
		}
		]
	},
	devtool: 'source-map'
};
