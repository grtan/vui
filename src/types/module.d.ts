/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue, { VueConstructor, DirectiveOptions, PluginObject, PluginFunction } from 'vue'

interface Plugin {
  install: PluginFunction<any>
}

// declare module 'vue/types/vue' {
//   interface VueConstructor {
//     install: Install
//   }
// }

// declare module 'vue/types/options' {
//   interface DirectiveOptions {
//     install: Install
//   }
// }

export class VuiComponent extends Vue {
  static install: PluginFunction<any>
}

export type VuiDirective = DirectiveOptions & PluginObject<any>
