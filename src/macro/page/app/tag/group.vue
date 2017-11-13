<template>
  <div class="tag-group">
    <div class="tag-group__header"> {{ tagGroup.label }} </div>
    <ul class="tag-list">
      <Item v-for="(tag, index) in tagGroup.tags" v-bind:tag="tag" :key="index"></Item>
    </ul>
  </div>
</template>

<script>
import Item from './item.vue';

export default {
  props: ['tagGroup'],
  components: {
    Item
  }
}
</script>

<style lang="scss">
  .tag-list {
    margin: 0;
    padding: 0;
  }
</style>
