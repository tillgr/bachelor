<template> 
    <span class="play_button" @click="$emit('clicked')" :class="{active:isActive, playing:isPlaying, pulse:true}">
        <span v-if="!isPlaying" class="material-icons">play_arrow</span>
        <span v-if="isPlaying" class="material-icons">stop</span>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class BasicPlayButton extends Vue {
    @Prop({default:true}) isActive!:boolean;
    @Prop({default:false}) isPlaying!:boolean;
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";
    .play_button{
        padding:20px;
        color:$backgroundColor;
        width:80px;
        height:80px;
        border-radius: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
        text-decoration:none;
        transition:border 0.2s ease;
        transition:background-color 0.5s ease;

        &.active{
            border:2px solid $accentColor;
            color:$accentColor;
            cursor:pointer;
        }
        .active:hover, &.playing{
            background-color: $accentColor;
            color:$backgroundColor;
        }


        &.finished{
            color:$backgroundColor;
            background-color:$textDescriptionColor;
        }

        .material-icons{
            font-size:$iconFontSize;
        }
    }
</style>