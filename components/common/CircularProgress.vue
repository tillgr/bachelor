<template> 
    <svg
      :height="radius * 2"
      :width="radius * 2"
      class="circular_progress"
     >
        <circle
            class="circle"
            stroke="#f1f3f7"
            :stroke-width="stroke - 2"
            fill="transparent"
            fill-opacity="0.0"
            :r="normalizedRadius"
            :cx="radius"
            :cy="radius"
        ></circle>
       <circle
            v-if="isActive"
            class="circle remaining"
            stroke="#ff0050"
            :stroke-dasharray="strokeDashoffset()"
            :stroke-width="stroke"
            fill="transparent"
            fill-opacity="0.0"
            :r="normalizedRadius"
            :cx="radius"
            :cy="radius"
        ></circle>
     
        <foreignObject v-if="!isActive"
            class="content"
            :width="1.5*radius"
            :height="1.5*radius"
            :x="radius*0.25"
            :y="radius*0.25"
            >
            <slot></slot>
        </foreignObject>   
        
        <text   
            class="label caption_text" 
            v-if="isActive"
            :y="radius"
            :x="radius">
            <tspan     
                alignment-baseline="central"     
                text-anchor="middle">
                    {{getFromattedTime()}}
            </tspan>
        </text>
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class CircularProgress extends Vue {
    
    @Prop({default:true}) isActive!:boolean;
    @Prop({default:70}) radius!:number;
    @Prop({default:10}) stroke!:number;
    @Prop({default:100}) timeLimit!:number;
    @Prop({default:0}) timePassed!:number;

    normalizedRadius = this.radius - this.stroke * 2;
    circumference = this.normalizedRadius * 2 * Math.PI;
        
    strokeDashoffset():string{
        return `${(this.timeFraction() * this.circumference).toFixed(0)} ${this.circumference}`;
    };
    getProgress():number{
        return (this.timeLimit - this.timePassed) / this.timePassed;
    };
    getFromattedTime():string{
        const timeLeft = this.timeLeft();
        const min = Math.floor(timeLeft/60);
        var sec = timeLeft%60;
        var formattedSec = "";
        if(sec < 10){
            formattedSec = '0' + sec;
        }else{
            formattedSec = '' + sec;
        }
        return String(min)+ ':' + formattedSec;
    };
    timeLeft():number{
        return this.timeLimit - this.timePassed;
    };
    timeFraction():number{
        const rawTimeFraction = this.timeLeft() / this.timeLimit
        return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
    };  
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";
.circular_progress{
    .circle{
        &.remaining{
            stroke-linecap: round;
            transform: rotate(-90deg);
            transform-origin: center;
            transition: 1s linear all;
        }
        
    }
    .content{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        text-align:center;
        padding:20px;

        span:first-child, div:first-child{
            width:70%;
            height:70%;
            padding:0px;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }
    }
    .label {
        display: flex;
        align-items: center;
        justify-content: center; 
    }
}
</style>