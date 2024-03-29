<template>
  <div ref="preview" class="vue-run-sfc-preview">
    <vue-element-loading
      :active="loading"
      spinner="spinner"
      :color="themeColor"
    />

    <iframe
      sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
      scrolling="yes"
      ref="iframe"
      frameborder="0"
      style="border: none;height: 150px;width: 100%;"
    ></iframe>
  </div>
</template>

<script>
// 参考: https://github.com/QingWei-Li/vuep.run/blob/master/src/components/preview.vue
import Vue from "vue";
import VueElementLoading from "vue-element-loading";
const { debounce } = require("throttle-debounce");
const merge = require("deepmerge");

export default {
  components: {
    VueElementLoading
  },
  props: {
    jsLabs: {
      type: Array,
      default: () => []
    },
    js: {
      type: [Array, String],
      default: () => []
    },
    cssLabs: {
      type: Array,
      default: () => []
    },
    css: {
      type: [Array, String],
      default: () => []
    },
    value: {
      type: Object,
      required: true
    },
    themeColor: {
      type: String,
      default: "#409eff"
    }
  },
  mounted() {
    if (!this.hasDocument()) return;
    const iframe = this.$refs.iframe;
    const iframeDocument = iframe.contentWindow.document;
    const stylesTags = this.cssLabs.map(
      style => `<link rel="stylesheet" href="${style}" />`
    );
    const scriptTags = this.jsLabs.map(
      script => `<script src="${script}"><\/script>`
    );
    const js = Array.isArray(this.js) ? this.js : [this.js];
    const css = Array.isArray(this.css) ? this.css : [this.css];
    const html = `
<!DOCTYPE html>
  <html>
    <head>
      ${stylesTags.join("\n")}
      <style>${css.join("\n")}</style>
      <script src='https://cdn.jsdelivr.net/npm/vue@2.6.11'><\/script>
      ${scriptTags.join("\n")}
      <script>${js.join("\n")}<\/script>
      <script>
        // 错误处理
        var errorHandler = function(error) {
          var el = document.getElementById('error')
          el.innerHTML = '<pre style="color: red">' + error.stack +'</pre>'
        }
        Vue.config.warnHandler = function(msg) { errorHandler(new Error(msg)) }
        Vue.config.errorHandler = errorHandler
        Vue.config.productionTip = false
        Vue.config.devtools = false
      <\/script>
    </head>
    <body id="body">
      <div><pre id="error" style="color: red"></pre></div>
      <div id="box"></div>
    </body>
</html>`;
    iframeDocument.open();
    iframeDocument.write(html);
    iframeDocument.close();
    iframe.onload = () => {
      this.setHTML();
      this.loading = false;
    };

    iframe.error = () => {
      this.loading = false;
    };
  },
  data() {
    return {
      iframe: null,
      iframeDocument: null,
      loading: true
    };
  },
  watch: {
    value(data) {
      this.setHTML(data);
    }
  },
  methods: {
    hasWindow() {
      const iframe = this.$refs.iframe;
      if (!iframe || !iframe.contentWindow) {
        return false;
      }
      return true;
    },
    hasDocument() {
      const iframe = this.$refs.iframe;
      if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) {
        return false;
      }
      return true;
    },
    // 根据内容更改高度
    changeHeight() {
      if (!this.debounceChangeHeight) {
        this.debounceChangeHeight = debounce(300, () => {
          if (!this.iframe || !this.iframeDocument) return;
          const iframe = this.iframe;
          const iframeDocument = this.iframeDocument;
          iframe.style.display = "block";
          const extendHeight = 10; // 额外的高度(避免出现滚动条)
          const height =
            iframeDocument.documentElement.offsetHeight + extendHeight;
          iframe.style.height = height + "px";
          if (this.$refs.preview) {
            this.$emit("change-height", this.$refs.preview.clientHeight);
          }
        });
      }
      this.debounceChangeHeight();
    },
    getScript(script, template) {
      return ` try {
          var exports = {};
          ${script}
          var component = exports.default;
          // 如果定义了 template函数, 则无需 template
          component.template = component.template || ${template}
        } catch (error){
          errorHandler(error)
        }

        new Vue(component).$mount('#app')
      `;
    },
    // 设置html
    setHTML() {
      let { styles = [], script = "", template, errors } = this.value;
      if (!this.hasDocument() || !template) return;
      const iframe = this.$refs.iframe;
      const iframeDocument = iframe.contentWindow.document;
      /**
       * 这段代码会让Vue不支持原生组件，先干掉
       * https://github.com/dream2023/vue-run-sfc/issues/19
       */
      // iframe.contentWindow.Vue.options = merge(
      //   Vue.options,
      //   iframe.contentWindow.Vue.options
      // );
      if (iframeDocument) {
        const elError = iframeDocument.getElementById("error");
        if (elError) {
          if (errors) {
            elError.style.display = "block";
            elError.innerText = `${errors.join("\n")}`;
          } else {
            elError.style.display = "none";
          }
        }

        const elBox = iframeDocument.getElementById("box");
        if (elBox) {
          const fragment = iframeDocument.createDocumentFragment();
          // 创建样式
          const newStyle = iframeDocument.createElement("style");
          newStyle.type = "text/css";
          newStyle.innerHTML = styles.join("\n");

          // 创建元素
          const elApp = iframeDocument.createElement("div");
          elApp.setAttribute("id", "app");
          script = this.getScript(script, template);

          // 创建js
          const newScript = iframeDocument.createElement("script");
          newScript.type = "text/javascript";
          newScript.innerHTML = script;

          // 重置 html
          elBox.innerHTML = "";

          // 填充元素
          fragment.appendChild(newStyle);
          fragment.appendChild(elApp);
          fragment.appendChild(newScript);

          elBox.appendChild(fragment);

          this.iframe = iframe;
          this.iframeDocument = iframeDocument;

          if (!this.height) {
            this.$nextTick(() => {
              this.changeHeight();
              iframe.contentWindow.addEventListener(
                "resize",
                this.changeHeight,
                false
              );
            });
          }
        }
      }
    }
  },
  beforeDestory() {
    if (this.hasWindow()) {
      this.iframe.contentWindow.removeEventListener(
        "resize",
        this.changeHeight
      );
    }
  }
};
</script>

<style>
/* 展示区样式 */
.vue-run-sfc-preview {
  background: white;
  padding: 20px 15px;
}
</style>
