<template> 
    <div class="basic_slider">
        <div class="slider"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue, Watch } from "nuxt-property-decorator";

import stddef from '@/utils/stddef';

import { SVG, Svg, Ellipse, Line } from '@svgdotjs/svg.js'

@Component({})
export default class BasicSlider extends Vue{

    @Model('input') value!:number;
    
    @Prop({default:0}) min!:number;
    @Prop({default:1}) max!:number;
    @Prop({default:0.1}) stepSize!:number;

    sliderSVG = {} as Svg;
    handleCircle = {} as Ellipse;
    sliderLine = {} as Line;
    width = 0;
    handleWidth = 30;
    isActive = false;


    created(){
        
    }

    mounted(){
                
        this.sliderSVG = new Svg().addTo(".slider");
        this.handleCircle = this.sliderSVG.ellipse(this.handleWidth, this.handleWidth).fill(stddef.backgroundColor).stroke(stddef.accentColor).stroke({width: 4});
       
        this.sliderSVG.touchstart((event:TouchEvent)=>{
            this.isActive = true;
            this.handleCircle.center(this.calculatePos(event.touches[0].clientX) + this.handleWidth,25);
            this.$emit('clicked');
            var xPos = this.calculatePos(event.touches[0].clientX);
            this.calculateValue(xPos);
        });
        //this.sliderLine = this.sliderSVG.line(this.handleWidth,25,this.width - this.handleWidth,25).stroke({width:4, color:"#555"}).addClass('slider_line');
        this.sliderSVG.mousedown((event:MouseEvent)=>{
            this.isActive = true;
            this.handleCircle.center(this.calculatePos(event.clientX) + this.handleWidth,25);
            this.$emit('clicked');
            var xPos = this.calculatePos(event.clientX);
            this.calculateValue(xPos);
        });

        this.sliderSVG.mousemove((event:MouseEvent)=>{this.mouseMove(event);});
        this.sliderSVG.touchmove((event:TouchEvent)=>{this.touchMove(event);});
      
        window.addEventListener("resize", this.resize);
        //window.addEventListener('mousemove',this.mouseMove);
        //window.addEventListener('touchmove', this.touchMove);
        //window.addEventListener('mousedown', this.mouseMove);
        window.addEventListener('mouseup',()=>{this.isActive = false});
        window.addEventListener('touchend',()=>{this.isActive = false});

        this.createSVG();
        this.resize();
    }

    mouseMove(event:MouseEvent){
        if(this.isActive){
            this.$emit('clicked');
            var xPos = this.calculatePos(event.clientX);
            this.calculateValue(xPos);
        };
    };

    touchMove(event:TouchEvent){
        if(this.isActive){
            this.$emit('clicked');
            if( event.touches.length > 0){
                var xPos = this.calculatePos(event.touches[0].clientX);
                this.calculateValue(xPos);
            };
        };
    };

    calculatePos(x:number):number{
       return x - document.getElementsByClassName('slider_line')[0].getBoundingClientRect().left;
    }

    destroyed() {
        window.removeEventListener("resize", this.resize);
        window.removeEventListener('mouseup',()=>{this.isActive = false});
        window.removeEventListener('touchend',()=>{this.isActive = false});
        window.removeEventListener('mousemove',this.mouseMove);
        window.removeEventListener('touchend', this.touchMove);
    };

    calculateValue(xPos:number){
        var range = this.max - this.min;
        var percentage = xPos / (this.width - 2*this.handleWidth);

        if(percentage > 1)
            percentage = 1;
        else if (percentage < 0)
            percentage = 0;

        var val = percentage * range + this.min;
        val = Math.floor(val/this.stepSize) * this.stepSize;
        this.$emit('input',val);
    };

    resize(){
        this.sliderLine.remove();
        this.createSVG();
        var range = this.max - this.min;
        this.handleCircle.center(this.handleWidth + (this.value - this.min)/range * (this.width - 2*this.handleWidth),25)
    };

    createSVG(){
        this.width = this.$parent.$el.clientWidth - 2*this.handleWidth;
        this.sliderSVG = this.sliderSVG.size(this.width, 50);
        this.sliderLine = this.sliderSVG.line(this.handleWidth,25,this.width - this.handleWidth,25).stroke({width:4, color:"#555"}).addClass('slider_line');
        var range = this.max - this.min;
        this.handleCircle.center(this.handleWidth + (this.value - this.min)/range * (this.width - 2*this.handleWidth),25)
        this.handleCircle.front();
    };

    @Watch('value')
    changedValue(value:number,oldValue:number){
        var range = this.max - this.min;
        this.handleCircle.center(this.handleWidth + (value - this.min)/range * (this.width - 2*this.handleWidth),25)
    };

    @Watch("isActive")
    changedActive(value:boolean,oldValue:boolean){
        if(value){
            this.handleCircle.fill(stddef.accentColor);
        }
        else{
            this.handleCircle.fill(stddef.backgroundColor);
        }
    };

};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";
.basic_slider{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    // max-width:500px;
}


</style>