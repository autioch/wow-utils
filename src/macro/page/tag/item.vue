<template>
  <li
    class="tag" v-bind:class="{ 'is-selected' : tag.isSelected }"
    @click="toggleTag"
    v-bind:style="{ 'background-color': '' /*tag.color */}"
  >
    <span>{{ tag.label}}</span>
  </li>
</template>

<script>
export default {
  props: ['tag'],
  methods: {
    toggleTag(){
      this.$store.commit('toggleTag', {id: this.tag.id});
    }
  }
}
</script>

<style lang="scss">
.tag {
  background-color: #eee;
  display: block;
  cursor: pointer;
  padding: .1em .5em;
  opacity: .6;
  color: #000;
  border: solid 1px transparent;
  margin-bottom: .25em;

  &.is-selected {
    opacity: 1;
    border-color: #333;
  }
}
</style>
