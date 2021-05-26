<template> 
    <input class="basic_input caption_text" :type="type" @input="$emit('input',$event.target.value)" :placeholder="placeholder" :value="value">
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class BasicInput extends Vue {
    @Prop({default:'text'}) type!:string;
    @Prop({default:''}) value!:string;
    @Prop({default:'...'}) placeholder!:string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";
.basic_input{
    -webkit-appearance: none;  
    appearance: none;
    text-align:center;
    padding: 10px 0px;
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