<template>
  <div :class="$style.root">
    <div v-for="{ type, list } in manifest" :key="type" :class="$style.type">
      <div :class="$style.name">
        {{ type }}
      </div>
      <template v-for="(item, index) in list">
        <router-link v-if="!item.list" :key="index" :class="$style.module" :to="`/${item.lowerEnName}`">
          {{ item.enName }} {{ item.zhName }}
        </router-link>
        <div v-else :key="index" :class="$style.category">
          <div :class="$style.name">
            {{ item.category }}
          </div>
          <router-link
            v-for="({ enName, zhName, lowerEnName }, idx) in item.list"
            :key="idx"
            :class="$style.module"
            :to="`/${lowerEnName}`"
          >
            {{ enName }} {{ zhName }}
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" module>
.type {
  color: #666;
  font-size: 50px;
  line-height: 2.5;
  text-align: left;

  &:not(:first-child) {
    border-top: 30px solid #fafafa;
  }

  > .name {
    font-size: 70px;
    text-align: center;
  }
}

.category {
  > .name {
    background: #f6f6f6;
    padding: 0 1em;
  }
}

.module {
  border-top: 1px solid #f6f6f6;
  color: #666;
  display: block;
  margin: 0 1em;
  position: relative;
  text-decoration: none;

  &::after {
    border-color: #ccc;
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: '';
    height: 0.4em;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 0.4em;
  }

  &:hover {
    color: #000;

    &::after {
      border-color: currentColor;
    }
  }

  .category > .name + & {
    border: 0;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import manifest from '../manifest'

@Component
export default class Home extends Vue {
  manifest = manifest
}
</script>
