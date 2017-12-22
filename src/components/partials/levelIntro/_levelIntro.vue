<!--
* silent 2017
* [- pre home vue -]
-->

<!-- templating html -->
<template>
  <div id="levelIntro" class="levelIntro">
    <p class="levelIntro__explain">Have you ever imagined what our world would look like if we took the time to look at it differently ?</p>
    <div class="homeTutorial__containerLink">
      <a href="#" class="homeTutorial__link" v-on:click.prevent="closeNotif()" v-on:mouseenter="soundButton"  data-title="J’ai compris">J’ai compris</a>
      <div class="homeTutorial__containerHover">
        <a href="#" class="homeTutorial__link homeTutorial__link--hover" v-on:click.prevent="closeNotif()" data-title="J’ai compris">J’ai compris</a>
      </div>
    </div>
  </div>
</template>


<!-- script  -->
<script type="text/javascript" src="@/components/preHome/_preHome.js"></script>


<!-- sass stylesheet -->
<style media="screen" src="@/components/preHome/_preHome.scss" lang="scss" scoped></style>
