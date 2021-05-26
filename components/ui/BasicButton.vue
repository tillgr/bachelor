<template> 
    <button class="outline_button pulse" :class="{button_inactive:!isActive}" @click="click($event)">
        <slot v-if="!arrow_icon"></slot>
        <div v-if="arrow_icon"><span class="material-icons">keyboard_arrow_right</span></div>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class BasicButton extends Vue{
    @Prop({default:false}) arrow_icon!:boolean;
    @Prop({default:true}) isActive!:boolean;
    
    click(event: MouseEvent | TouchEvent){
        if(this.isActive){
            this.$emit('click',event)
        };
    };
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

div {
    align-items: center;
    justify-content: center;
}

.outline_button{
    margin: $basicMargin;
    background-color:inherit;
    min-height:50px;
    .material-icons{
        font-size:$iconFontSize;
    }
}
.button_inactive{
    border-color:$backgroundHighlightColor;
    color:$backgroundHighlightColor;
    background-color:$backgroundColor;
    &:hover{
        border-color:$backgroundHighlightColor !important;
        background-color:$backgroundColor !important;
        cursor:inherit !important;
    }
    animation: none;
}


</style>