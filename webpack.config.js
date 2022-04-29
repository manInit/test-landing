const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const target = 'browserslist'
const mode = process.env.NODE_ENV
let isDev = mode === 'development'

const minimizer = []
const plugins = [
	new MiniCssExtractPlugin({
		filename: 'styles.[hash].css'
	}),
	new HtmlWebpackPlugin({
		template: './src/index.pug',
		inject: 'body',
		minify: false
	})
];

if (isDev) {
	plugins.push(new ESLintPlugin({
		extensions: ['js']
	}))
} else {
	minimizer.push(new ImageMinimizerPlugin({
		minimizer: {
			implementation: ImageMinimizerPlugin.imageminMinify,
			options: {
				plugins: [
					['gifsicle', { interlaced: true }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
				]
			}
		}
	}))
}

module.exports = {
	mode: mode,
	target: target,
	entry: ['./src/index.js', './src/styles/index.scss'],
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[name][ext]',
		clean: true,
		publicPath: '/'
	},
	module: {
		rules: [
			{
        test: /\.pug$/,
				loader: '@webdiscus/pug-loader'
      },
			{
				test: /\.(s[ac]|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: ''
						} 
					}, 
					'css-loader', 
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(ttf|woff2?|eon|otf)$/,
				type: 'asset/resource',
			
			}
		]
	},
	optimization: {
		minimizer
	},
	plugins,
	resolve: {
		extensions: ['.js']
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		static: {
      directory: path.join(__dirname, 'dist'),
    },
		open: true,
    port: 8080,
	}
}