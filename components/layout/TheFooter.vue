<template>
    <footer>
        <nav class="nav">
            <div class="footer_container ">
                <div class="left">
                    <a href="" class="caption_text link" target="_blank"></a>
                </div>
            </div>
            <div class="footer_container align_end">
                <div class="right">
                    <a href="" class="caption_text link" target="_blank">impressum</a>
                    <a href="" class="caption_text link" target="_blank">contact</a>
                </div>
            </div>
        </nav>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

footer{
    display:flex;
    justify-content: center;
    background-color:$backgroundColor;
    height: 80px;
    
    .nav{
        display:grid;
        grid-template-columns: 50% 50%;
        background-color:$backgroundColor;
        width:100%;
        max-width: $maxWidth;

        .footer_container{
            display:flex;
            flex-direction:column;
            flex-wrap:wrap;
            align-items:flex-start;
            justify-content: center;
            padding:$basicPadding $edgePadding;

            &.align_end{
                align-items:flex-end;
            }


            .left{
                display:flex;
                flex-direction:column;
                flex-wrap:wrap;
                align-items:center;
                justify-content: center;

            }
            .right{
                text-align:right;
                display:flex;
                flex-direction:row;
                flex-wrap:wrap;
                align-items:center;
                justify-content: center;

                .link{
                    margin-right: 10px;
                    align-self:end;
                }
            }
        }
    }
}
</style>