<!--
* silent 2017
* [- friend vue -]
-->

<!-- templating html -->
<template>
    <div id="friend__container" class="friend__container">
        <svg class="friend__container__svg friend__eyesAnime" width="85px" viewBox="0 0 85 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <path d="M16,25 C18.7614237,25 21.3193614,23.9948866 21.3193614,21.2334628 C21.3193614,18.4720391 18.7614237,16.5110387 16,16.5110387 C13.2385763,16.5110387 11.501175,18.4720391 11.501175,21.2334628 C11.501175,23.9948866 13.2385763,25 16,25 Z" id="path-1"></path>
                <filter x="-137.5%" y="-159.0%" width="375.0%" height="418.1%" filterUnits="objectBoundingBox" id="filter-2">
                    <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                    <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
                <path d="M28.1425347,24.792986 C29.9220852,24.792986 30.7759738,23.3503753 30.7759738,21.5708248 C30.7759738,19.7912742 29.9220852,16.792986 28.1425347,16.792986 C26.3629841,16.792986 26.0257562,19.5408477 26.0257562,21.3203982 C26.0257562,23.0999487 26.3629841,24.792986 28.1425347,24.792986 Z" id="path-3"></path>
                <filter x="-284.2%" y="-168.8%" width="668.4%" height="437.5%" filterUnits="objectBoundingBox" id="filter-4">
                    <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                    <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
            </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Artboard" transform="translate(-705.000000, -782.000000)">
                    <g id="pot" transform="translate(705.000000, 782.000000)">
                        <g id="Body" transform="translate(1.000000, 49.000000)" fill="#000000">
                            <path d="M20.8965806,0.361807843 C30.8965806,0.361807843 47.87096,39 34.3837703,39 C25.3923105,39 13.9310537,39 0,39 C7.26438707,13.2412052 14.2299139,0.361807843 20.8965806,0.361807843 Z" id="Rectangle-2"></path>
                        </g>
                        <g id="Head" class="head" transform="translate(0.000000, 11.000000)">
                            <path d="M21.6965161,41.2671013 C34.3990653,41.2671013 40.7733298,36.4786916 40.7733298,23.5 C40.7733298,10.5213084 32.7025492,0 20,0 C7.29745075,0 0.0563872935,10.5213084 0.0563872935,23.5 C0.0563872935,36.4786916 8.99396681,41.2671013 21.6965161,41.2671013 Z" id="Oval-5" fill="#000000"></path>
                            <g id="Oval-4" class="eyesG">
                                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
                                <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use>
                            </g>
                            <g id="Oval-4" class="eyesR">
                                <use fill="black" fill-opacity="1" filter="url(#filter-4)" xlink:href="#path-3"></use>
                                <use class="eyesR__scale" fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-3"></use>
                            </g>
                        </g>
                        <g id="Head__hair" transform="translate(11.000000, 0.000000)" fill="#000000">
                            <path d="M9.93936772,0.400341152 C15.5497603,6.87333406 17.4269752,11.2611178 15.5710124,13.5636924 C12.7870682,17.0175542 -5.88734522,14.2310463 2,13 C7.25823015,12.1793025 9.90468605,7.97941618 9.93936772,0.400341152 Z" id="Rectangle-3"></path>
                            <path d="M17.1421405,6 C20.6342724,10.0290487 21.8027258,12.7601801 20.6475006,14.1933943 C18.9146628,16.3432155 7.2909638,14.6087819 12.2003617,13.8425297 C15.4732937,13.3316948 17.1205533,10.7175183 17.1421405,6 Z" id="Rectangle-3"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </div>
</template>
  
  
  <!-- script  -->
  <script type="text/javascript" src="@/components/partials/friend/_friend.js"></script>
  
  
  <!-- sass stylesheet -->
  <style media="screen" src="@/components/partials/friend/_friend.scss" lang="scss" scoped></style>
  