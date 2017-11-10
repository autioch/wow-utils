<template>
  <div class="macro" v-bind:class="{ 'is-hidden' : item.isHidden}">
    <div class="macro__prefix-wrapper">
      <ul class="macro__prefix">
        <li v-for="prefix in item.prefix">{{prefix}}</li>
      </ul>
    </div>
    <div>
      <ul class="macro__label">
        <li v-for="label in item.label">{{label}}</li>
      </ul>
    </div>
    <div>
      <ul class="macro__icon">
        <li v-for="icon in item.icon">{{icon}}</li>
      </ul>
    </div>
    <div>
      <ul class="macro__tag">
        <li v-for="tag in item.tags">{{tag}}</li>
      </ul>
    </div>
    <div class="macro__content-wrapper">
      <ol class="macro__content">
        <li v-for="content in item.content">{{content}}</li>
      </ol>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
  }
</script>

<style lang="scss">
  .macro {
    display: flex;
    width: 100%;
    border-bottom: solid 1px #aaa;
    align-items: stretch;

    > div {
      flex: none;
      padding: .25em;
      border-right: solid 1px #aaa;
    }

    > .macro__content-wrapper {
      flex: 1 1 auto;
      // overflow-x: auto;
    }

    &.is-hidden {
      display:none;
    }
  }

  .macro__prefix,
  .macro__content,
  .macro__label,
  .macro__icon,
  .macro__tag {
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 100%;
    word-break: break-all;
  }

  .macro__content {
    padding-left: 1.5em;
    list-style-type: decimal;
  }

  .macro__prefix-wrapper {
    border-left: solid 1px #aaa;
  }

  .macro__prefix {
    width: 1em;
  }

  .macro__label {
    width: 8em;
  }

  .macro__icon {
    width: 12em;
  }

  .macro__tag {
    width: 8em;
  }
</style>
