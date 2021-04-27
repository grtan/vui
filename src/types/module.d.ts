import { DirectiveOptions, DirectiveFunction, PluginObject, PluginFunction } from 'vue'
/**
 * 必须要引入'vue/types/vue'，否则demo中ts编译器不会包含该声明文件，导致编译会报错
 * 最佳实践是扩展哪个模块，就手动import该模块
 */
import 'vue/types/vue'
import { VideoJsPlayer } from 'video.js'

interface Plugin {
  install: PluginFunction<any>
}

declare module 'vue/types/vue' {
  interface Vue {
    // readonly $attrs: Record<string, any>
    $vui: Record<string, any> & {
      historyAction: 'new' | 'forward' | 'back' | 'refresh' | 'replace'
    }
  }

  interface VueConstructor {
    $vui: Vue['$vui']
  }
}

declare module 'vue/types/options' {
  // interface DirectiveOptions {
  //   install: Install
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends Vue> {
    player?: VideoJsPlayer
  }
}

export interface VuiComponent {
  install: PluginFunction<any>
}

export type VuiDirective = (DirectiveOptions | DirectiveFunction) & PluginObject<any>
