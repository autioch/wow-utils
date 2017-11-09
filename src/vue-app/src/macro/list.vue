<template>
  <div class="list">
    <item v-for="(item,index) in list" v-bind:item="item" :key="index"></item>
  </div>
</template>

<script>
import Item from './item.vue';
export default {
  components: {
    Item
  },
  data(){
    return {
      list: this.$store.state.macros
    };
  }
}
</script>

<style lang="scss">
.list {
  height: 100%;
  overflow: auto;
  flex-grow: 1;
}
</style>
