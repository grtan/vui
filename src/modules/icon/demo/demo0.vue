<template>
  <div :class="$style.root">
    <div v-for="(name, index) in icons" :key="index" :class="$style.item" :title="name">
      <vui-icon :name="name"></vui-icon>
      <div :class="$style.name">{{ name }}</div>
    </div>
    <div v-for="i in 4" :key="`_${i}`" :class="[$style.item, $style.placeholder]"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiIcon from '../component.vue'

@Component({
  components: {
    VuiIcon
  }
})
export default class VComponent extends Vue {
  static title = '所有图标'
  // eslint-disable-next-line no-undef
  private icons: string[] = ICONS
}
</script>

<style lang="scss" module>
.root {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .item {
    align-items: center;
    display: flex;
    flex: auto;
    flex-direction: column;
    margin: 20px;
    width: 200px;

    :global(.vui-icon) {
      font-size: 50px;
    }

    .name {
      margin-top: 10px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .placeholder {
    margin: 0 20px;
  }
}
</style>
