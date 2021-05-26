<template>
  <svg class="logo" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 311.1 128.8" style="enable-background:new 0 0 311.1 128.8;" xml:space="preserve">
    <text transform="matrix(1 0 0 1 10.0833 55.2656)" class="st1 st2 st3"></text>
    <text transform="matrix(1 0 0 1 10.0833 109.3865)" class="st4 st2 st3"></text>
  </svg>
</template>
<script lang="ts">
import { Component ,Vue } from "nuxt-property-decorator";
@Component({})
export default class Logo extends Vue{};
</script>
<style lang="scss" scoped>
.logo{
  padding:0px !important;
}
@import "~/assets/style/vars.scss";
  .st0{fill:none;}
  .st1{fill:$textDescriptionColor;}
  .st2{font-family:'Open Sans Condensed'; font-weight: 600;}
  .st3{font-size:42px;}
  .st4{fill:rgb(224, 196, 35);}

</style>
