<template> 
    <div class="valueTicker">
        <span><slot></slot></span>
        <div>
            <BasicArrowButton :isActive="!disabled && value > getMin()" :left="true" @click="()=>{updateValue(-tick);}"></BasicArrowButton>
            <span :class="{small:hasOptions()}">{{getValue()}}</span>
            <BasicArrowButton :isActive="!disabled && value < getMax()" @click="()=>{updateValue(tick);}"></BasicArrowButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from "nuxt-property-decorator";

import BasicArrowButton from '@/components/ui/BasicArrowButton.vue'

@Component({ components: {
        BasicArrowButton,
    }
})
export default class BasicValueTicker extends Vue{
    @Prop({default:1})          min!:number;
    @Prop({default:10})         max!:number;
    @Prop({default:1})          tick!:number;
    @Prop({default:3})          value!:number;
    @Prop({default:() => []})   options!:[];
    @Prop({default:false})      disabled!:boolean;

    mounted() {

    }

    hasOptions(): boolean {
        return this.options.length > 0;
    }

    updateValue(val:number) {
        this.$emit("onValue", Math.max(this.getMin(), Math.min(this.getMax(), this.value + val)));
    }

    getValue(): number {
        if(this.hasOptions()) {
            return this.options[this.value];
        }
        return this.value;
    }

    getMin(): number {
        if(this.hasOptions()) {
            return 0;
        }
        return this.min;
    }

    getMax(): number {
        if(this.hasOptions()) {
            return this.options.length - 1;
        }
        return this.max;
    }

};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

    .valueTicker {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        span {
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
        }

        div {
            display: flex;
            flex-flow: row nowrap;

            .arrowButton {
                margin: 5px;
            }

            span {
                width: 5rem;
                height: 2rem;
                border-radius: 3px;

                margin: 5px;

                font-size: 1.5rem;
            
                line-height: normal;
                display: flex;
                align-items: center;
                justify-content: center;

                &.small {
                    font-size: 1.2rem;
                }
                background-color: $backgroundColor;
            }
        }
    }

</style>