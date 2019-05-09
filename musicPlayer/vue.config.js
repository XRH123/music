const path = require('path');

function resolve(dir) {
	return path.join(__dirname, './', dir)
}

module.export = {
	configureWebpack: {
		resolve: {
			extensions: ['.js', '.vue', '.scss', '.json']
		},
		plugin: []
	},
	chainWebpack: config => {
		config.resolve.alias
			.set('COMPONENTS', resolve('src/components'))
			.set('SCSS', resolve('src/assets/scss'))
			.set('IMG', resolve('src/assets/img'))
	},
	// devServer: {
	// 	proxy: {
	// 		"/api": {
	// 			target: "https://c.y.qq.com/",
	// 			secure: false,
	// 			pathRewrite: {
	// 				"^/api": ""
	// 			},
	// 			changeOrigin: true,
	// 			logLevel: "debug"
	// 		}
	// 	}
	// }
}