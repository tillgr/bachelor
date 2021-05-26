<template> 
    <span class="round_button" @click="clicked()" :class="{active:isActive, finished:!isActive, pulse:isActive}">
        <span v-if="isActive" class="material-icons">keyboard_arrow_right</span>
        <span v-if="!isActive" class="material-icons">done</span>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class RoundButton extends Vue {
    @Prop({default:false}) isActive!:boolean;


    clicked(){
        if(this.isActive){
            this.$emit('clicked');
        };
    };
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

.round_button{
    padding:$basicPadding;
    color:$backgroundColor;
    border-radius: 50%;
    width:10px;
    height:10px;
    @include shadowTop();
    display:flex;
    justify-content: center;
    align-items: center;
    text-decoration:none;
    transition:all 0.2s ease;

    &.active{
        border:2px solid $accentColor;
        color:$accentColor;
        cursor:pointer;
    }

    &.finished{
        color:$backgroundColor;
    }

    .material-icons{
       font-size:$iconFontSize;
    }
}


</style>