<template>
    <header>
        <nav class="nav">
            <div class="logo">
                <nuxt-link to="/">
                    <Logo/>
                </nuxt-link>
            </div>
            <div class="menu" v-on:click="showSlidingMenu = true">
                <span class="material-icons">
                    short_text
                </span>
            </div>
        </nav>
        <transition name="slide_left">
            <div class="background"  v-if="showSlidingMenu" v-on:click="showSlidingMenu = false;"></div>
        </transition>
        <transition name="slide_right">
            <div class="sliding_menu"  v-if="showSlidingMenu">
                <span v-on:click="showSlidingMenu = false;" class="material-icons"> clear </span>
                <div class="container">
                    <nuxt-link to='/' @click.native="showSlidingMenu = false;"> 
                        <div class="header_link">home</div>
                    </nuxt-link>
                </div>
            </div>
        </transition>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Logo from '@/components/common/Logo.vue';

@Component({
    components:{
        Logo
    }
})
export default class Header extends Vue{
   
    showSlidingMenu = false;       
   
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

header{
    //position:fixed;
    //top:0px;
    display:flex;
    justify-content: center;
    background-color:$backgroundColor;
    width:100vw;
    height: 80px;
    min-height: 80px;
    z-index:3;
    @include shadow();
    
    .nav{
        height:100%;
        display:grid;
        grid-template-columns: 50% 50%;
        background-color:$backgroundColor;
        width:100%;
        max-width:$maxWidth;

        .logo{
            grid-column-start:1;
            align-self:center;
            height:40px;
            animation: 0.3s appear;
            padding:0px $edgePadding;


        }
        .menu{
            grid-column-start:2;
            justify-self: end;
            align-self:center;
            animation: 0.3s appear;
            padding:0px $edgePadding;
            
            .material-icons{
                cursor:pointer;
            }
        }
    }

    .background{
        width:100vw;
        height:100vh;
        position:absolute;
        top:0px;
        left:0px;
        background-color:$backgroundColor;
        opacity: 0.7;
    }

    .sliding_menu{
        position:absolute;
        height:100vh;
        width:70vw;
        max-width:400px;
        padding:$basicPadding 0px $basicPadding $basicPadding;
        display:flex;
        flex-direction: column;
        justify-items: center;
        top:0px;
        right:0px;
        background-color:$backgroundHighlightColor;
        @include shadow();

        .material-icons{
            padding:$basicPadding;
            margin:$basicMargin;
            cursor:pointer;
        }
        .container{
            display:flex;
            flex-direction:column;
            padding:$basicPadding;
            background-color:$backgroundHighlightColor;
            align-items:flex-start;
            justify-content: flex-start;

            .header_link{
                font-size: 1.5rem;
                padding: $basicPadding;
                &:hover{
                    color:black;
                }
            }
        }
    }
}


</style>