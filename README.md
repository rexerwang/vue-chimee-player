# vue-chimee-player

<p>
  <a href="https://www.npmjs.com/package/vue-chimee-player"><img src="https://img.shields.io/npm/v/vue-chimee-player.svg" alt="Version"></a>
  <a href="https://npmcharts.com/compare/vue-chimee-player?minimal=true"><img src="https://img.shields.io/npm/dm/vue-chimee-player.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-chimee-player"><img src="https://img.shields.io/npm/l/vue-chimee-player.svg" alt="License"></a>
</p>

[chimee player](https://github.com/Chimeejs/chimee) component/directive for [@vuejs](http://vuejs.org)  
用于 Vue 的 chimee 播放器组件

## Install

`npm i -S vue-chimee-player`

> `chimee-player` 需要自行安装

## Usage

1. 基本参数与 chimee 保持一致，有下列新增参数:

   - source: {Array} 当前播放源数组 [{src: 播放源, resolution: 清晰度}]
   - [clarity]: {Number|String} 指定播放清晰度，默认最低清晰度 1080|720|480|360|'auto'

   **若指定 src|plugin.chimeeControl, 则覆盖上述新增参数**

2. 事件注册:

   - 支持`.once`修饰符: `@play.once="handler"`
   - 支持指定 target: `@play:kernel="handler2"`

   [播放器事件说明](http://chimee.org/docs/chimee_api.html#%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95),
   [事件列表](https://github.com/Chimeejs/chimee/blob/master/src/helper/const.js)

## Example:

见`./example`，
运行`npm run example`
