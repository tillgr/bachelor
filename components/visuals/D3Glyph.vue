<template>
  <BasicCard class="d3_card" ref="canvas">
    <p class="body_text overlay">
      {{ name }}
    </p>
    <p class="body_text overlay" style="margin-top: 155px;">
      {{ label }}
    </p>
  </BasicCard>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";

import BasicCard from "@/components/ui/BasicCard.vue";
import BasicRow from "@/components/ui/BasicRow.vue";
import BasicButton from "@/components/ui/BasicButton.vue";
import { IAudioFeatures } from "~/helper/audioAnalyzer";

import * as d3 from "d3";

@Component({
  components: {
    BasicCard,
    BasicRow,
    BasicButton,
  },
})
export default class D3Glyph extends Vue {
  @Prop({default: ""})  name!: string;
  @Prop({default: ""})  label!: string;
  @Prop({default: 3})   length!: number;
  @Prop({default:()=>{return {loudness:0.5,pitch:0.5,brightness:0.5,richness:0.5,pitchiness:0.5,sharpness:0.5} as IAudioFeatures}}) features!: IAudioFeatures;

  created() {
    
  }
  mounted() {
    (this.$refs.canvas as Vue).$el.id = `mir-${this.name}`;
   // this.createGlyph();
  }

  @Watch('features', {deep:true})
  onFeatures(value:IAudioFeatures, old:IAudioFeatures){
    let svg = (this.$refs.canvas as Vue).$el.getElementsByTagName('svg')[0];
    if(svg) svg.remove();
    this.createGlyph();
  }

  createGlyph() {


    const svg = d3
        .select("#mir-" + this.name)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    svg
        .append("g")
        .attr("transform", "translate(105, 105)")
        .style("transform", `translate(50%, 50%)`);

    const g =  svg.selectAll("g");

    g.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", '-25%')
        .attr("y", '-25%')
        .attr("width", '50%')
        .attr("height", '50%')
        .style("fill", "blue"); //TODO: loudness = saturation, hue = pitch

    g.append("circle")
        .attr("cx", '0')
        .attr("cy", '0')
        .attr("r", "18%")
        .style("fill", "white");




    let centerShape = {
      ul: '',
      ur: '',
      ll: '',
      lr: '',
      translateY: 0,
      duplicated: false,

      calcTriangle(length: number){ //TODO: shape = sharpness muss noch möglich sein
        let a; //kathete vertikal
        let b = length/2;  //kathete horizontal
        let c = length;    //hypothenuse

        a = Math.sqrt( Math.pow(c, 2) - Math.pow(b, 2));

        this.ul = `0 ${-a/2}`;
        this.ur = `0 ${-a/2}`;
        this.ll = `${-b} ${a/2}`;
        this.lr = `${b} ${a/2}`;

        if (!this.duplicated){
          this.translateY = -length/10;
          this.duplicated = true;
        }
        else this.translateY = 0;
      }
    }


    centerShape.calcTriangle(90)

    g.append("path")
        .attr('d', `M ${centerShape.ul} L${centerShape.ur} L${centerShape.ll} L${centerShape.lr} Z`)
        .attr("stroke", 'darkblue') //TODO: hue = pitch
        .style("fill", "transparent")
        .attr("transform", `translate(0, ${centerShape.translateY})`);

    centerShape.calcTriangle(40)  //TODO: 40 = fullness

    g.append("path")
        .attr('d', `M ${centerShape.ul} L${centerShape.ur} L${centerShape.ll} L${centerShape.lr} Z`)
        .style("fill", "blue")  //TODO brightness = brightness, hue = pitch
        .attr("transform", `translate(0, ${centerShape.translateY})`);

  }
  getColorForSoundType(randOn = false): string {
    let rand = Math.random();
    rand = rand < 0.3 ? 0.3 : rand <= 0.6 ? 0.6 : 1;

    const spectralComplexity = this.features.pitchiness;
    if (spectralComplexity < 10) {
      return randOn ? `rgba(24, 116, 205, ${rand})` : "rgba(24, 116, 205)";
    } else if (spectralComplexity < 25) {
      return randOn ? `rgba(0, 255, 0, ${rand})` : "green";
    } else {
      return randOn ? `rgba(255, 0, 0, ${rand})` : "red";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/style/vars.scss";
.d3_card {
  width: 100%;
  height: 100%;
  justify-self: center;

  background-color: white;

  .body_text {
    margin: 10px 10px;
    padding: 0px 0px;
    font-size: 0.8rem;
  }
  .overlay {
    position: absolute;
  }
}
</style>
