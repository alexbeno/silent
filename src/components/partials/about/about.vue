<!--
* silent 2017
* [- about vue -]
-->

<!-- templating html -->
<template>
    <div id="about" class="about">
      <div class="about__explainContainer">
        <div class="about__universDot"></div>
        <p class="about__explain"><span>Silent</span> is ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnansectetur adipiscing elit, sed do eiusmod tempor</p>
      </div>
      <div class="about__contributor">
        <h1 class="about__contributorTitle">Contributeurs</h1>
        <div class="about__contributorName">
          <div class="about__contributorName__single">
            <p class="about__contributorName__singleTitle">Alexis Benoliel</p>
            <p class="about__contributorName__singleTexte">Développeur Front-end</p>
          </div>
          <div class="about__contributorName__single">
            <p class="about__contributorName__singleTitle">Anna Baumann</p>
            <p class="about__contributorName__singleTexte">Développeur Front-end</p>
          </div>
          <div class="about__contributorName__single">
            <p class="about__contributorName__singleTitle">Paul Andrianoff</p>
            <p class="about__contributorName__singleTexte">Développeur Front-end</p>
          </div>
          <div class="about__contributorName__single">
            <p class="about__contributorName__singleTitle">Théo Rosel</p>
            <p class="about__contributorName__singleTexte">Interactive Designer</p>
          </div>
          <div class="about__contributorName__single">
            <p class="about__contributorName__singleTitle">Camille Pawlak</p>
            <p class="about__contributorName__singleTexte">Designer</p>
          </div>
          <div class="about__contributorName__single">
            <p class="about__contributorName__singleTitle">Jérémy Pichard</p>
            <p class="about__contributorName__singleTexte">Chef de projet</p>
          </div>
        </div>
      </div>
      <a href="#" class="about__close" v-on:click.prevent="closes">Fermer</a>
    </div>
  </template>


  <!-- script  -->
  <script type="text/javascript" src="@/components/partials/about/_about.js"></script>


  <!-- sass stylesheet -->
  <style media="screen" src="@/components/partials/about/_about.scss" lang="scss" scoped></style>
