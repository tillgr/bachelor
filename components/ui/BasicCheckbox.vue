<template> 
    <div class="basic_checkbox">
        <BasicOverlay class="overlay" v-if="showDescription">
            <BasicCard>
                <p class="caption_text">
                    {{title}}
                </p>
                <BasicRow borderRadiusTop="true">
                <p class="body_text">
                    {{description}}
                </p>
                </BasicRow>
                <BasicRow borderRadiusBottom="true" darken="true">
                    <BasicButton arrow_icon="true" @click="showDescription = false"></BasicButton>
                </BasicRow>
            </BasicCard>
        </BasicOverlay>
        <nuxt-link v-if="link" :to="link" class="caption_text"><p>{{title}} <span class="material-icons">new_releases</span></p></nuxt-link>
        <p v-else> <span class="caption_text" @click="showDescription = true">{{title}}</span><span class="material-icons">new_releases</span> </p>
        {{caption}}
        <div class="box" @click="$emit('input', !value)"> 
            <span class="material-icons" v-if="value" >check</span>
        </div> 
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";

import BasicOverlay from '@/components/ui/BasicOverlay.vue'
import BasicRow from '@/components/ui/BasicRow.vue' 
import BasicCard from '@/components/ui/BasicCard.vue'
import BasicButton from '@/components/ui/BasicButton.vue'
import BasicContainer from '@/components/ui/BasicContainer.vue'

@Component({
    components:{
        BasicOverlay, BasicCard, BasicRow, BasicContainer, BasicButton
    }
})
export default class BasicCheckbox extends Vue {
    @Prop({default:false}) value!:boolean;
    @Prop({default:''}) title!:string;
    @Prop({default:''}) caption!:string;
    @Prop({default:''}) link!:string;
    @Prop({default:''}) description!:string;
    
    showDescription = false;
}

</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

.basic_overlay {
    justify-content: center;
}

.basic_checkbox{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    width:100%;
    
    .caption_text{
        cursor:pointer;
        text-decoration:none;
        color:$textDescriptionColor;
        
        &:hover{
            .material-icons{
                color:$accentColor;
            }
         }
    }
    
    .box{
        
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        width:30px;
        height:30px;
        border-radius:$borderRadius;
        background-color:$whiteColor;
        border:2px solid $whiteColor;
        color:black;
        cursor:pointer;
        @include shadow();
        transition: all 0.2s ease;

        &:hover{
            border:2px solid $accentColor;
        }
        .material-icons{
            color:$accentColor;
        }
    }

    // &.checked{
    //     color:$accentColor;
    // }
}


</style>