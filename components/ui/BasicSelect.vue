<template> 
    <div class="basic_select">
        <div class="container" :class="{open:clicked}" @click="clicked = !clicked;">   
            <BasicInput class="input" v-model="filter" @input="isSearching = true; $emit('input',''); " ></BasicInput>
            <div v-if="!openOption()" class="material-icons" >keyboard_arrow_down</div>
            <div v-if="openOption()" class="material-icons"  >keyboard_arrow_up</div>
        </div>
        <ul  class="options caption_text" key="options" :class="{open:openOption()}">
            <li  v-for="(option,index) in filteredOptions()" :key="index" @click="currentItem.title = option.title; filter = option.title; isSearching = false;clicked = false; $emit('input',currentItem.title);" class="option">
                <div class="option_title">
                    {{option.title}}
                </div>      
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";
import BasicInput from '@/components/ui/BasicInput.vue'

@Component({
    components:{
        BasicInput
    }
})
export default class BasicSelect extends Vue{
    @Prop() options!:any[];
  
    clicked = false;
    currentItem = {title: ''};
    transitionName = 'expand';
    filter = '';
    isSearching = false;

    openOption(){
        if(this.clicked ||( this.isSearching && this.filter != "")){
            return true;
        }
        else
        return false;
    };
    filteredOptions(){
        if(this.isSearching){
            return this.options.filter(option=>{
                return option.title.toUpperCase().includes(this.filter.toUpperCase());
            });
        }
        else 
        return this.options;
    };
}

export interface SelectOptionModel{
    title:string,
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

.basic_input {
    padding: 0px 0px;
    margin: 20px;
}

.basic_select{
    color:black;
    cursor:pointer;
    width:100%;
    height:100%;
    
    .container{
        display:flex;
        flex-direction: row;
        justify-content: space-around;        
        min-height:100px;
        width:100%;

        .input{
            &:focus{
                border:0px !important;
                border-bottom:2px solid $accentColor;
            }
        }
        
        &.open{
            border-bottom:2px solid $accentColor;
        }
        &:hover{
            .material-icons{
                color:$accentColor;
            }
        }
        .current_selection{
            width:50%;
            text-align: center;
            align-self:center;
        }
        .material-icons{
            width:50%;
            height: 100%;
            align-self:center;
            text-align: center;
        }
       
    }
    .options{ 
        box-sizing: content-box;
        text-align:center;
        border:0px;
        background-color:inherit;
        outline:none;
        display:flex;
        flex-direction:column;
        list-style: none;
        align-items: center;
        margin:0px;
        padding-left:0px;
        max-height:0px;
        overflow-y:scroll;
        transition:all 0.3s ease;

        border-bottom-left-radius: $borderRadius;
        border-bottom-right-radius: $borderRadius;

       @include shadow();

        &.open{
            max-height:300px;
        }
       
        .option{
            display:flex;
            justify-content: center;
            width:calc(100% - 30px);
            padding-top:5px;
            padding-bottom:5px;
            padding-left:$basicPadding;
            padding-right:$basicPadding;
            margin-top:5px;
            margin-bottom:5px;
            cursor:pointer;
            text-align:center;

            &:last-child{
                padding-bottom:40px;

            }
             &:hover{
                 .option_title{
                    border-bottom:2px solid $accentColor;
                }
             }
           
            .option_title{
                border-bottom:2px solid $backgroundColor;
                transition: all 0.1s ease;
            }
        }
    }
}
</style>