const withFonts = require('next-fonts');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = withFonts({
  webpack(config, options) {
    config.plugins.push(
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      }));
    return config;
  }
});
