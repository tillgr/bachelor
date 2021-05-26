<template> 
    <textarea class="basic_input caption_text" @input="$emit('input',$event.target.value)"  :value="value"></textarea>
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class BasicTextArea extends Vue {
    @Prop({default:''}) value!:string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";
.basic_input{
    -webkit-appearance: none;  
    appearance: none;
    padding: 10px 10px;
    border:0px;
    background-color: white;
    border-radius: 5px;
    transition: all 0.2s ease;
    border-bottom:2px solid $backgroundHighlightColor;
    width:90%;

    &:hover {
        border-bottom:2px solid white;
    }
    &:focus{
        border:0px;
        border-bottom:2px solid $accentColor;

    }
}



</style>