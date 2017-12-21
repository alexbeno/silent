<!--
* silent 2017
* [- oneOne vue -]
-->

<!-- templating html -->
<template>
  <div id="oneOne" class="oneOne game">
    <img src="/static/image/level/background-3.png" alt="background" class="game__bg">
    <globalLvl :number="number" :title="title" :univers="univers" ></globalLvl>
    <canvas class="game_dot"></canvas>
    <audio src="/static/sound/Ambiance/chapOne.mp3" autoplay loop class="levelAudio"></audio>
  </div>
</template>


  <!-- script  -->
  <script type="text/javascript" src="@/components/level/oneOne/_oneOne.js"></script>


  <!-- sass stylesheet -->
  <style media="screen" src="@/components/level/oneOne/_oneOne.scss" lang="scss" scoped></style>
