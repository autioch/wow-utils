<template>
  <div>
    <div
      class="macro__line"
      v-for="line in lines"
      v-bind:class="{
        'macro__line--script': line.startsWith('/script'),
        'macro__line--cast': line.startsWith('/cast'),
        'macro__line--use': line.startsWith('/use'),
        'macro__line--startattack': line.startsWith('/startattack'),
        'macro__line--run': line.startsWith('/run'),
        'macro__line--tooltip': line.startsWith('#showtooltip'),
      }"
    >
      {{ line }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['lines'],
}
</script>

<style lang="scss">
.macro__line {
  word-break: break-all;
  padding: 1px;

  &:hover {
    background: #eee;
  }
}
.macro__line--script {
  color: #0a0;
}

.macro__line--cast {
  color: #a00;
}

.macro__line--use {
  color: #00a;
}

.macro__line--startattack {
  color: #0aa;
}

.macro__line--run {
  color: #a0a;
}

.macro__line--tooltip {
  color: #777;
}

</style>
