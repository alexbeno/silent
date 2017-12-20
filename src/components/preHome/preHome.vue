<!--
* silent 2017
* [- pre home vue -]
-->

<!-- templating html -->
<template>
  <div id="preHome" class="preHome">
    <p class="preHome__explain">Have you ever imagined what our world would look like if we took the time to look at it differently ?</p>
    <div class="preHomeDrag">
      <div class="preHomeDrag__drag">
          <div class="preHomeDrag__dragLine">
            <div class="preHomeDrag__dragLine__point preHomeDrag__dragLine__point--drag"></div>
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
  </div>
</template>


<!-- script  -->
<script type="text/javascript" src="@/components/preHome/_preHome.js"></script>


<!-- sass stylesheet -->
<style media="screen" src="@/components/preHome/_preHome.scss" lang="scss" scoped></style>
