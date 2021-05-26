<template>
    <div class="basic_icon">
        <div v-if="materialIcon">
            <span class="material-icons"> {{name}}</span>
        </div>        
        <div v-else>           
            <MaleIcon v-if="name == 'male'"></MaleIcon>
            <FemaleIcon v-if="name == 'female'"></FemaleIcon>
            <DiverseIcon v-if="name == 'diverse'"></DiverseIcon>
            <HeadphonesIcon v-if="name == 'headphones'"></HeadphonesIcon>              
        </div> 
    </div>
</template>
<script lang="ts">

import { Component, Prop ,Vue } from "nuxt-property-decorator"

import MaleIcon from '@/components/common/icons/MaleIcon.vue';
import FemaleIcon from '@/components/common/icons/FemaleIcon.vue';
import DiverseIcon from '@/components/common/icons/DiverseIcon.vue';
import HeadphonesIcon from '@/components/common/icons/HeadphonesIcon.vue';

@Component({
    components:{
        MaleIcon,
        FemaleIcon,
        DiverseIcon,
        HeadphonesIcon
    }
})
export default class BasicIcon extends Vue{
    @Prop() name!:string;
    @Prop() materialIcon!:boolean
};
export interface IconDataModel{
    materialIcon:boolean,
    name:string
}
</script>
<style lang="scss">
@import "~/assets/style/vars.scss";
.basic_icon{
    fill:$textDescriptionColor;
}
</style>
