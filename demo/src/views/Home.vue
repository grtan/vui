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
    padding: 0 1em;
    background: #f6f6f6;

    + .module {
      border: none;
    }
  }
}

.module {
  position: relative;
  display: block;
  margin: 0 1em;
  border-top: 1px solid #f6f6f6;
  color: #666;
  text-decoration: none;

  &:hover {
    color: #000;

    &::after {
      border-color: currentColor;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(45deg);
    border-color: #ccc;
    border-style: solid;
    border-width: 3px 3px 0 0;
    width: 0.4em;
    height: 0.4em;
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
