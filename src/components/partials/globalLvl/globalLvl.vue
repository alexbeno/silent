<!--
* silent 2017
* [- globalLvl vue -]
-->

<!-- templating html -->
<template>
  <div id="globalLvl" class="globalLvl">
    <div class="globalLvl__top">
      <div class="globalLvl__state">
        <p class="globalLvl__stateNumber"><span>{{number}}</span> / 3</p>
        <p class="globalLvl__stateTitle">{{title}}</p>
      </div>

      <div class="globalLvl__univers">
        <div class="globalLvl__universDot"></div>
        <h1 class="globalLvl__universTitle" v-on:click="goHome">{{univers}}</h1>
      </div>
    </div>
    <div class="globalLvl__bottom">
      <div class="globalLvl__left">
        <a href="#" class="globalLvl__play"><img src="/static/image/ui/play.svg" alt="play" class="globalLvl__playImg"></a>
        <div class="globalLvl__containerLink">
            <a href="#" class="globalLvl__link" v-on:click.prevent="closeNotif()" v-on:mouseenter="soundButton">TRAVERSER</a>
            <div class="globalLvl__containerHover">
              <a href="#" class="globalLvl__link globalLvl__link--hover">TRAVERSER</a>
            </div>
          </div>
      </div>
    </div>
    <audio src="/static/sound/interactions/buttonHover.mp3" class="homeButtonAudio"></audio>
  </div>
</template>

<!-- script  -->
<script type="text/javascript" src="@/components/partials/globalLvl/_globalLvl.js"></script>


<!-- sass stylesheet -->
<style media="screen" src="@/components/partials/globalLvl/_globalLvl.scss" lang="scss" scoped></style>
