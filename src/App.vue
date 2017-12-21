<template>
  <div id="app">
    <router-view/>
    <ink></ink>
    <headers></headers>
    <about></about>
  </div>
</template>

<script>
import ink from '@/components/partials/ink/ink';
import headers from '@/components/header/header';
import about from '@/components/partials/about/about';

export default {
  name: 'app',
  components: {
    ink,
    headers,
    about,
  },
}
</script>

<style lang="scss">
  @import 'assets/sass/app';
  @import 'assets/sass/abstracts/config/_registerFont.scss';
  @import 'assets/sass/base/_reset';
  @import 'assets/sass/base/_Zbase';
</style>
