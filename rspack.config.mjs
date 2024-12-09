import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error('Unknown bundler');
}

function shouldShareChunk(chunk) {
  return chunk.name !== 'main';
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: 'production',
  devtool: false,
  entry: {
    main: './src/root.jsx',
    'app-a': './src/app-a.jsx',
    'app-b': './src/app-b.jsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Webpack App</title>
          <!-- Ensure that the shared initial chunks are present -->
          <script src="react.js></script>
          <script src="redux.js></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
      `,
      // Only load the 'main' chunk -- it will be responsible for determine which application to load
      chunks: ['main'],
    }),
  ],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, 'webpack-dist')
      : path.resolve(__dirname, 'rspack-dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: isRunningRspack ? 'builtin:swc-loader' : 'swc-loader',
          options: {
            sourceMaps: false,
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
              target: 'ES2017',
            },
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: shouldShareChunk,
      cacheGroups: {
        react: {
          test: /\/node_modules\/(react|react-dom|object-assign|scheduler|loose-envify)\//,
          name: 'react',
          chunks: shouldShareChunk,
        },
        redux: {
          test: /\/node_modules\/(@reduxjs|react-redux|redux)\//,
          name: 'redux',
          chunks: shouldShareChunk,
        },
      },
    },
    concatenateModules: true,
    usedExports: true,
    chunkIds: 'deterministic',
    moduleIds: 'deterministic',
    minimize: false,
  },
};

export default config;
