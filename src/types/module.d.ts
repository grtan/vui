import Vue, { DirectiveOptions, DirectiveFunction, PluginObject, PluginFunction } from 'vue'

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

// declare module 'vue/types/options' {
//   interface DirectiveOptions {
//     install: Install
//   }
// }

export class VuiComponent extends Vue {
  static install: PluginFunction<any>
}

export type VuiDirective = (DirectiveOptions | DirectiveFunction) & PluginObject<any>
