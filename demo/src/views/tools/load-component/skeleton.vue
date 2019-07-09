<template>
  <div>
    <content-placeholders v-for="n in 5">
      <content-placeholders-heading :img="true"/>
      <content-placeholders-text :lines="3"/>
    </content-placeholders>
  </div>
</template>