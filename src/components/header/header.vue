<!--
* silent 2017
* [- header vue -]
-->

<!-- templating html -->
<template>
  <div id="headers" class="header">
      <a href="#" class="header__about" v-on:click.prevent="opens">À propos</a>
      <a href="#" class="header__sound"><img src="/static/image/ui/cut.svg" alt="play" class="header__soundImg"></a>
  </div>
</template>


<!-- script  -->
<script type="text/javascript" src="@/components/header/_header.js"></script>


<!-- sass stylesheet -->
<style media="screen" src="@/components/header/_header.scss" lang="scss" scoped></style>
