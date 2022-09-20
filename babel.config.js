// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }
module.exports = {
  presets: [
    ['@babel/preset-env', {
      corejs: "core-js@3",
    },
    ],
  ],
}
