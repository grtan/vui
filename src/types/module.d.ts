/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue, { VueConstructor, DirectiveOptions, DirectiveFunction, PluginObject, PluginFunction } from 'vue'

interface Plugin {
  install: PluginFunction<any>
}

declare module 'vue/types/vue' {
  interface Vue {
    // readonly $attrs: Record<string, any>
    $vui: Record<string, any>
  }

  interface VueConstructor {
    $vui: Record<string, any>
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
