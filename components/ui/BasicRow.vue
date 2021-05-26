<template> 
    <section class="row" :class="{dark:darken, border_radius_top:borderRadiusTop,border_radius_bottom:borderRadiusBottom}">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class BasicRow extends Vue{
    @Prop({default:false}) darken!:boolean;
    @Prop({default:false}) borderRadiusTop!:boolean;
    @Prop({default:false}) borderRadiusBottom!:boolean;
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";
.row{
    border-bottom: 2px solid $whiteColor;
    border-left: 2px solid $whiteColor;
    border-right: 2px solid $whiteColor;
    background-color:$backgroundColor;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:70px;
    @include shadow();

    &.pad{
        padding: $edgePadding $edgePadding;
    }

    &.dark{
        background-color:$backgroundHighlightColor;
    }

    &.border_radius_top{
        border-top-left-radius: $borderRadius;
        border-top-right-radius: $borderRadius;
        border-top: 2px solid $whiteColor; 
        @include shadowTop();            
    }
    &.border_radius_bottom{
        border-bottom-left-radius: $borderRadius;
        border-bottom-right-radius: $borderRadius;
    }
                
}


</style>