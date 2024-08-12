module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  experiments: {
    outputModule: true,
  },
  output: {
    module: true,
    library: {
      type: 'module'
    },
    filename: "myWidget.js"
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }
};
