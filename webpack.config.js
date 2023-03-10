const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry:{
    index: './src/index.js',
    gameboard: './src/gameboard.js',
    gamemanager: './src/gamemanager.js',
    player: './src/player.js',
    ship: './src/ship.js',
    eventmanager: './src/eventmanager.js',
    gridpanel: './src/gridpanel.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      tile: 'Battleship'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, 
  },
  optimization:{
    runtimeChunk: 'single',
  },
  module:{
    rules:[
      {
        test:/\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
