module.exports = {
	plugins: [
		//自动添加css前缀
        require('autoprefixer'),
        //转换rem  需 install postcss-plugin-px2rem
        // require("postcss-plugin-px2rem")({
        //     remUnit: 100,
        //     mediaQuery: true,
        //     exclude:"/node_modules/i",
        //     selectorBlackList: ['html', 'mint-', 'mt-', 'mpvue-', 'calendar', 'iconfont'], //在rem.js全局作用下   排除指定的文件的影响
        //     propBlackList: ['border']
        //   })
	]
};