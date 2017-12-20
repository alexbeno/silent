<!--
* silent 2017
* [- home vue -]
-->

<!-- templating html -->
<template>
  <div id="home" class="home">
    <img src="/static/image/home/fireflies__one.png" alt="firefly" class="home__firefly home__firefly--one">
    <img src="/static/image/home/fireflies__two.png" alt="firefly" class="home__firefly home__firefly--two">

    <img src="/static/image/home/mountain-three-right.svg" alt="mountain" class="home__mountain home__mountain--three">
    <img src="/static/image/home/mountain-two-right.svg" alt="mountain" class="home__mountain home__mountain--two">
    <img src="/static/image/home/mountain-one-left.svg" alt="mountain" class="home__mountain home__mountain--one">
    <div class="home__blur"></div>
    <div class="home__bottomBar"></div>
    <div class="home__friend">
      <friend></friend>
      <a href="#" class="homeFriend__button" v-on:click.prevent="notif()"><img class="homeFriend__bullet" src="/static/image/home/bullet.svg"/></a>
    </div>
    <div class="home__navigation">
      <div class="home__title">
        <h1 class="homeTitle__txt">SILENT</h1>
        <h3 class="homeTitle__explain">The web experience where you see and deplace yourself only whit your hears. </h3>
      </div>
      <div class="home__lvl">
        <h1 class="homeLvl__txt"></h1>
      </div>
      <div class="home__circle home__circle--top">
        <circles></circles>
        <div class="home__point home__point--notActive home__point--one" v-on:click="clickEventLevel" lvl-one="one-one" lvl-two="one-two" lvl-three="one-three" part-name="Awake in the clearing">
          <div class="home__point__content"></div>
        </div>
        <div class="home__point home__point--notActive home__point--two" v-on:click="clickEventLevel" lvl-one="two-one" lvl-two="two-two" lvl-three="two-three" part-name="Grosse partie 2">
          <div class="home__point__content"></div>
        </div>
        <div class="home__point home__point--notActive home__point--three" v-on:click="clickEventLevel" lvl-one="three-one" lvl-two="three-two" lvl-three="three-three" part-name=" Grosse partie 3">
          <div class="home__point__content"></div>
        </div>
      </div>
      <div class="home__circle home__circle--bottom">
        <circles></circles>
        <div class="home__point home__point--notActive home__point--three lvlName--three" data-lvl="null">
            <div class="home__point__content"></div>
            <p class="home__point__number home__point__number--three">03</p>
        </div>
        <div class="home__point home__point--notActive home__point--two lvlName--two" data-lvl="null">
          <div class="home__point__content"></div>
          <p class="home__point__number home__point__number--two">02</p>
        </div>
        <router-link to="/about" >
        <div class="home__point home__point--one home__point--active lvlName--one" data-lvl="null">
            <div class="home__point__content"></div>
            <p class="home__point__number home__point__number--one">01</p>
        </div>
        </router-link>
      </div>
    </div>
    <div class="home__noise"></div>
    <div class="home__tutorial">
      <p class="homeTutorial__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
      <div class="homeTutorial__containerLink">
        <a href="#" class="homeTutorial__link" v-on:click.prevent="closeNotif()" data-title="J’ai compris">J’ai compris</a>
        <div class="homeTutorial__containerHover">
          <a href="#" class="homeTutorial__link homeTutorial__link--hover" v-on:click.prevent="closeNotif()" data-title="J’ai compris">J’ai compris</a>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- script  -->
<script type="text/javascript" src="@/components/home/_home.js"></script>


<!-- sass stylesheet -->
<style media="screen" src="@/components/home/_home.scss" lang="scss" scoped></style>
