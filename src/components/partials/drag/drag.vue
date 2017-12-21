<!--
* silent 2017
* [- circle vue -]
-->

<!-- templating html -->
<template>
  <div class="preHomeDrag">
      <div class="preHomeDrag__drag">
          <div class="preHomeDrag__dragLine">
          <v-touch class='preHomeDrag__dragLine__pointContainer' tag="div" v-on:panstart="panStart" v-on:panmove="panMove" v-on:panend="panEnd" >
            <div class="preHomeDrag__dragLine__point preHomeDrag__dragLine__point--drag"></div>
          </v-touch>
            <div class="preHomeDrag__dragLine__line"></div>
            <div class="preHomeDrag__dragLine__point preHomeDrag__dragLine__point--two"></div>
          </div>
      </div>
      <div class="preHomeDrag__headPhone">
          <div class="preHomeDrag__headPhone__contain">
            <img class="preHomeDrag__headPhone__svg" src="/static/image/home/headphones.svg"/>
          </div>
          <p class="preHomeDrag__headPhone__text">PUT ON YOUR HEADPHONES & DRAG TO EXPLORE</p>
      </div>
  </div>
</template>
  
<!-- script  -->
<script type="text/javascript" src="@/components/partials/drag/_drag.js"></script>


<!-- sass stylesheet -->
<style media="screen" src="@/components/partials/drag/_drag.scss" lang="scss" scoped></style>
  