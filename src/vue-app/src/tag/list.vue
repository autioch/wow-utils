<template>
  <div class="tag-group-list">
    <TagGroup v-for="(tagGroup, index)  in list" v-bind:tagGroup="tagGroup" :key="index"></TagGroup>
  </div>
</template>

<script>
import TagGroup from './group.vue';

export default {
  components: {
    TagGroup
  },
  data(){
    return {
      list: this.$store.state.tagGroups
    };
  }
}
</script>

<style lang="scss">
  .tag-group-list {
    // position: fixed;
    // top: 0;
    // left: 0;
    // background-color: #def;
  }
</style>
