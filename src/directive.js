/**
 * chimee-player directive plugin
 * @author rexerwang
 */

import './index.scss'
import ChimeePlayer from 'chimee-player'
import merge from 'deepmerge'

const isPretty = any => Array.isArray(any) && any.length

/**
 * 清晰度
 * @type {*[]}
 */
const ClaritySet = [
  { resolution: 1080, name: '1080P' },
  { resolution: 720, name: '超清' },
  { resolution: 480, name: '高清' },
  { resolution: 360, name: '标清' },
  { resolution: 'auto', name: '自动' }
]

/**
 * 初始化配置
 * @param option
 */
function initOptions(option) {
  // 默认参数
  const defaultOptions = {
    controls: true
  }

  // 默认插件
  const pluginOptions = {
    chimeeControl: {
      name: 'chimeeControl',
      children: {
        play: true,
        progressTime: true,
        progressBar: {},
        volume: {},
        clarity: {},
        screen: {},
        playbackrate: true
      }
    }
  }

  let { source, clarity, plugin: plugins, ...options } = merge(
    defaultOptions,
    option
  )

  // 设置片源（清晰度）
  if (isPretty(source)) {
    let clarityList = []
    for (let i = 0, l = ClaritySet.length; i < l; i++) {
      const { name, resolution: res } = ClaritySet[i]
      for (let j = source.length; j--; ) {
        const { resolution, src } = source[j]
        if (resolution === res) {
          clarityList.push({ src, name, resolution })
        }
        // 指定清晰度
        !options.src && res === clarity && (options.src = src)
      }
    }
    if (clarityList.length) {
      // 默认播放低清晰度
      !options.src && (options.src = clarityList[clarityList.length - 1].src)
      // 设置清晰度
      pluginOptions.chimeeControl.children.clarity.list = clarityList
    }
  }

  // 插件配置
  if (isPretty(plugins)) {
    for (let i = 0, l = plugins.length; i < l; i++) {
      const plugin = plugins[i]
      const pluginOption = pluginOptions[plugin.name]
      if (pluginOption) {
        plugins[i] = merge(pluginOption, plugin)
      }
    }
  } else {
    plugins = Object.values(pluginOptions)
  }

  options.plugin = plugins

  return options
}

const directive = {
  bind(el) {
    el.classList.add('chimee-player-container')
  },
  inserted(el, binding, vnode) {
    const ctx = vnode.context
    const ref = binding.arg || 'player' // 播放器实例引用

    // 参数处理
    const options = initOptions(merge(binding.value, binding.modifiers))
    options.wrapper = el

    // 初始化播放器
    const player = new ChimeePlayer(options)

    // 事件: 播放器与vue事件机制串联
    const eventListeners =
      (vnode.data && vnode.data.on) ||
      (vnode.componentOptions && vnode.componentOptions.listeners)

    if (eventListeners) {
      Object.entries(eventListeners).forEach(([event, handler]) => {
        const listener = (...payload) => handler.fns(...payload)
        let register = player.on.bind(player)

        // .once修饰符
        const once = event.startsWith('~')
        if (once) {
          event = event.substr(1)
          register = player.once.bind(player)
        }

        // ready事件
        if (event === 'ready') {
          player.ready.then(listener)
        }
        // 指定target
        else if (event.indexOf(':') > 1) {
          const index = event.lastIndexOf(':')
          const target = event.substring(index + 1)
          const eventName = event.substring(0, index - 1)
          target && eventName && register(eventName, listener, { target })
        } else {
          register(event, listener)
        }
      })
    }

    ctx[ref] = player
  },
  // update(el, binding, vnode) {},
  // componentUpdated(el, binding, vnode) {},
  unbind(el, binding, vnode) {
    // 销毁播放器
    const ctx = vnode.context
    const ref = binding.arg || 'player'
    ctx[ref].destroy()
    ctx[ref] = null
    el.classList.remove('chimee-player-container')
  },
  install(Vue) {
    Vue.directive('chimee-player', directive)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  directive.install(window.Vue)
}

export default directive
