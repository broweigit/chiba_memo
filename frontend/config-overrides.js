const { override, addWebpackPlugin } = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function override(config, env) {
    // 只在构建生产版时修改配置
    if (env === 'production') {
        // 确保BundleAnalyzerPlugin添加到plugins数组
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
        }));

        // 配置TerserPlugin
        config.optimization.minimizer.push(new TerserPlugin({
            // TerserPlugin的配置项
            parallel: true, // 使用多进程并行运行来提高构建速度
            terserOptions: {
                // 这里可以放置terser的配置项
                compress: {
                    drop_console: true, // 移除console
                },
            },
        }));
    }

    return config;
};
