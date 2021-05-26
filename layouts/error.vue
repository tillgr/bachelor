<template>
  <div>
    <div class="layout_wrapper">
      <article class="content">
        <h1>An error occurred</h1>
        <nuxt-link class="link caption_text" to="/">Back to home page</nuxt-link>
      </article>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';
import TheFooter from '@/components/layout/TheFooter';

export default {
  components:{
    TheHeader,
    TheFooter
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/vars.scss";

.layout_wrapper{
  background-color:$backgroundColor;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;

  .content{
    width:100%;
    max-width:$maxWidth;
    padding:$basicPadding;
    margin:$basicMargin;
    text-align:center;

    .link{
        font-size:24px;
    }
  }
  
  }
</style>
