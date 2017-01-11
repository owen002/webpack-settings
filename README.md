####
首先全局安装webpack 和 webpack-dev-server
    npm install -g webpack webpack-dev-server

####附autoprefixer的配置：[链接](https://github.com/ai/browserslist#queries)
        last 2 versions: the last 2 versions for each major browser.
        last 2 Chrome versions: the last 2 versions of Chrome browser.
        > 5%: versions selected by global usage statistics.
        > 5% in US: uses USA usage statistics. It accepts two-letter country code.
        > 5% in my stats: uses custom usage data.
        ie 6-8: selects an inclusive range of versions.
        Firefox > 20: versions of Firefox newer than 20.
        Firefox >= 20: versions of Firefox newer than or equal to 20.
        Firefox < 20: versions of Firefox less than 20.
        Firefox <= 20: versions of Firefox less than or equal to 20.
        Firefox ESR: the latest [Firefox ESR] version.
        iOS 7: the iOS browser version 7 directly.
        not ie <= 8: exclude browsers selected before by previous queries. You can add not to any query.

#### webpack --hot命令的作用
--hot do the following stuff:

adds the HotModuleReplacementPlugin
with --inline it adds 'webpack/hot/dev-server' to every entry
switches the webpack-dev-server into hot mode, which post messages instead of reloading the page. devServer: { hot: true }
--inline adds webpack-dev-server/client?<webpack-dev-server url> to all entry points.