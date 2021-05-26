<template>
  <div class= "global_layout">
    <TheHeader/>
    <div class="layout_wrapper">
      <article class="content padding_top">
        <nuxt/>
      </article>
    </div>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

export default {
  components:{
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/vars.scss";
.global_layout{
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  
  min-height: 100vh;
  max-height: 100vh;

  .layout_wrapper{
    flex: 1;
    min-width: 100vw;
    height: 100%;
    background-color:$backgroundColor;
    article {
      display:block;
      flex-direction:column;
      justify-content: center;
      align-items:center;
      align-content: stretch;
      
    }
    .content{
      width:100%;
      max-width:$maxWidth;
    

      &.padding_top{
        //padding-top:80px;
      }
    }
    
    }
}
</style>
