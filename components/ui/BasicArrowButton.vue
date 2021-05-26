<template> 
    <button @click="$emit('click')" class="arrowButton" :disabled="!isActive" :class="{active:isActive, pulse:false}">
        <span v-if="left" class="material-icons">keyboard_arrow_left</span>
        <span v-else class="material-icons">keyboard_arrow_right</span>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class BasicArrowButton extends Vue{
    @Prop({default:true}) isActive!:boolean;
    @Prop({default:false}) left!:boolean;
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

    .arrowButton {
        padding:$basicPadding;
        margin: 0px;
        color:$textInputColor;
        border-radius: 50%;
        width:20px;
        height:20px;
        //@include shadowTop();
        display:flex;
        justify-content: center;
        align-items: center;
        text-decoration:none;
        transition:all 0.2s ease;
        opacity: 0.4;
        &.active {
            opacity: 0.8;
        }

        &:hover.active {
            //border:2px solid $accentColor;
            color:$accentColor;
            cursor:pointer;
            opacity: 1.0;
        }

        .material-icons {
            font-size:$iconFontSize;
        }
    }
</style>