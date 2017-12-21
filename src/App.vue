<template>
  <div id="app">
    <router-view/>
    <ink></ink>
  </div>
</template>

<script>
import ink from '@/components/partials/ink/ink';

export default {
  name: 'app',
  components: {
    ink,
  },
}
</script>

<style lang="scss">
  @import 'assets/sass/app';
  @import 'assets/sass/abstracts/config/_registerFont.scss';
  @import 'assets/sass/base/_reset';
  @import 'assets/sass/base/_Zbase';
</style>
