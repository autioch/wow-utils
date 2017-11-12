<template>
  <div id="app">
    <TagList></TagList>
    <MacroList></MacroList>
  </div>
</template>

<script>
import TagList from './tag/list.vue';
import MacroList from './macro/list.vue';

export default {
  components: {
    TagList,
    MacroList
  }
}
</script>

<style lang="scss">
html {
  color: #444;
  font-family: monospace;
  font-size: 12px;
}

body, html {
  border: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
