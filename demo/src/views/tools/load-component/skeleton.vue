<template>
  <div>
    <content-placeholders v-for="n in 5" :key="n">
      <content-placeholders-heading :img="true" />
      <content-placeholders-text :lines="3" />
    </content-placeholders>
  </div>
</template>