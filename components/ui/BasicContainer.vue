<template> 
    <div class="basic_container">
        <section  id="description">
            <slot name="description"></slot>
        </section>
        <BasicCard id="left_side">
            <slot  name="left_side"></slot>
        </BasicCard>
        <BasicCard id="right_side">
            <slot  name="right_side"></slot>
        </BasicCard>
    </div>
</template>

<script lang="ts">
import { Component,Vue} from "nuxt-property-decorator";
import BasicCard from '@/components/ui/BasicCard.vue';

@Component({
    components:{
        BasicCard
    }
})
export default class BasicContainer extends Vue {};
</script>

<style lang="scss">
@import "@/assets/style/vars.scss";
.basic_container{
    display: grid;
    grid-template-columns:100%;
    justify-items: center;
    align-items: center;
    padding:$basicPadding;
    margin:0px auto;
    width:100%;

    #description{
        width:90%;
        max-width:400px;
        order:1;
    }
  
    #left_side{
        order:3;
        min-width:300px;
    }
    #right_side{
        order:2;
        min-height:300px;
        min-width:300px;
        align-self:stretch;
    }
}
@media only screen and (min-width: 992px) {
    .basic_container{
        display: grid;
        grid-template-columns: 30% 70%;
        grid-template-rows: 50% 50%;
        grid-column-gap: $basicMargin;
        grid-row-gap: 0px; 
        max-width:1100px;

        margin:50px auto;
      
        #description{
            grid-area: 1 / 1 / 2 / 2;
            //align-self:end;
            justify-self:center;
            //padding-bottom: $edgePadding;
        }
        #left_side{
            grid-area: 2 / 1 / 3 / 2;;
            align-self:end;
            justify-self:stretch;
            width:100%;
            max-width:1000px;

            .row:first-child{
                border-top-left-radius: $borderRadius !important;
                border-top-right-radius: $borderRadius !important;
                border-top:2px solid $whiteColor !important;
                @include shadowTop();
            }
        }
        #right_side{
            grid-area: 1 / 2 / 3 / 3;
            justify-self:stretch;
            align-self:end;
            max-width:600px;
            width:100%;
            justify-content:end;
                
                .row:last-child{
                    border-bottom-left-radius: $borderRadius !important;
                    border-bottom-right-radius: $borderRadius !important;
                    border-bottom:2px solid $whiteColor !important;
                }
        }

    }
}
@media only screen and (min-width: 1500px) {
    .basic_container{
        margin:50px auto;
        max-width:1500px;
    }
}

</style>