<template> 
    <div class="basic_toggle" v-if="options">
        <ul class="toggle_list">
            <li  v-for="(option,index) in options" :key="index" @click="$emit('input',option.value)" :class="{selected:(value === option.value), disabled:option.disabled}" >
                <div v-if="option.icon.name">
                    <BasicIcon class="custom_icons" :materialIcon="option.icon.materialIcon" :name="option.icon.name"></BasicIcon>
                    <span class="tooltiptext">{{name(option)}}</span>
                </div>
                <p v-else class="caption_text">{{name(option)}}</p>
            </li>
        </ul>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import BasicIcon from '@/components/common/icons/BasicIcon.vue';

@Component({
    components:{
        BasicIcon
    }
})
export default class BasicToggle extends Vue {
    @Prop() options!:any[];
    @Prop() value!:any;

    name(option:any):string {
        let name = option.title;
        if(option.disabled)
            name += " (not optimised!)";
        return name;
    }
};
</script>

<style lang="scss">
@import "@/assets/style/vars.scss";
.basic_toggle{
    height:100%;
    background-color:inherit;
    display:flex;
    flex-direction:row;
    width:90%;

    .toggle_list{
        width:100%;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        list-style: none;
        padding-left:0px;

        li{
            display:flex;
            justify-content: center;
            align-items: center;
            height:50px;
            width:50px;
            border-bottom:2px solid $whiteColor;
            padding:$basicPadding;
            margin:5px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            &:hover{
                border-bottom: 2px solid $accentColor;

                .tooltiptext{
                    visibility: visible;
                }
            }
            .tooltiptext{
                visibility: hidden;
                background-color: $textDescriptionColor;
                color: $backgroundColor;
                text-align: center;
                border-radius: $borderRadius;
                padding: 5px 0;
                position: absolute;
                z-index: 10;
                width: 120px;
                bottom: 120%;
                left: 50%; 
                margin-left: -60px;
            }

            &.selected{
                border-bottom: 2px solid $accentColor;
                color:black !important; 
                path{
                    fill:black !important;
                }
            }
            &.disabled{
                opacity: 0.5;
            }

            .custom-icons{
                path{
                    fill:$textDescriptionColor;
                }
            }

        }
    }
}




</style>