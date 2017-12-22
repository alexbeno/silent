<!--
* silent 2017
* [- twoThree vue -]
-->

<!-- templating html -->
<template>
  <div id="twoThree" class="twoThree game">
    <img src="/static/image/level/background-3.png" alt="background" class="game__bg">
    <globalLvl :number="number" :title="title" :univers="univers" ></globalLvl>
    <canvas class="canvas_final"></canvas>
    <div class="game__brume"></div>
    <canvas class="game_dot"></canvas>
    <!-- canvas game-->

    <audio src="/static/sound/Ambiance/chapOne.mp3" autoplay loop class="levelAudio"></audio>
    <audio src="/static/sound/Personnage/footstepsWin.mp3" autoplay loop class="footStart"></audio>
    <audio src="/static/sound/Personnage/falling.mp3" loop class="footFall"></audio>
    <audio src="/static/sound/Personnage/footstepsStart.mp3" loop class="footWin"></audio>
    <!-- game audio -->
    <audio src="/static/sound/Game/0.mp3"  class="gameNote"></audio>
    <audio src="/static/sound/Game/1.mp3"  class="gameNote"></audio>
    <audio src="/static/sound/Game/2.mp3"  class="gameNote"></audio>
    <audio src="/static/sound/Game/3.mp3"  class="gameNote"></audio>
    <audio src="/static/sound/Game/4.mp3"  class="gameNote"></audio>

    <!--#ALEX : renseigne info -->
<!--     <span class="life"></span>
    <span class="lifeTotal"></span> -->


  </div>
</template>


  <!-- script  -->
  <script type="text/javascript" src="@/components/level/twoThree/_twoThree.js"></script>


  <!-- sass stylesheet -->
  <style media="screen" src="@/components/level/twoThree/_twoThree.scss" lang="scss" scoped></style>
