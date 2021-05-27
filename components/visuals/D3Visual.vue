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
import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";

import BasicCard from "@/components/ui/BasicCard.vue";
import BasicRow from "@/components/ui/BasicRow.vue";
import BasicButton from "@/components/ui/BasicButton.vue";
import {IAudioFeatures} from "~/helper/audioAnalyzer";

import * as d3 from "d3";

@Component({
  components: {
    BasicCard,
    BasicRow,
    BasicButton,
  },
})
export default class D3Visual extends Vue {
  @Prop({default: ""}) name!: string;
  @Prop({default: ""}) label!: string;
  @Prop({default: 3}) length!: number;
  @Prop({
    default: () => {
      return {
        loudness: 0.5,
        pitch: 0.5,
        brightness: 0.5,
        richness: 0.5,
        pitchiness: 0.5,
        sharpness: 0.5
      } as IAudioFeatures
    }
  }) features!: IAudioFeatures;

  created() {

  }

  mounted() {
    (this.$refs.canvas as Vue).$el.id = `mir-${this.name}`;
    // this.createGlyph();
  }

  @Watch('features', {deep: true})
  onFeatures(value: IAudioFeatures, old: IAudioFeatures) {
    let svg = (this.$refs.canvas as Vue).$el.getElementsByTagName('svg')[0];
    if (svg) svg.remove();
    this.createGlyph();
  }

  createGlyph() {
    const rand = Math.random();
    const rand2 = Math.random();
    const rand3 = Math.random();
    const rand4 = Math.random();

    const length = (360 / 30) * this.length;
    const average_loudness =
        48 -
        Math.round(
            this.features.loudness * -1 * (20 / 54)
        );

    const svg = d3
        .select("#mir-" + this.name)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(105, 105)")
        .style("transform", `translate(50%, 50%)`);

    //Dauer der Audiodatei
    const generator = d3
        .arc() // v4
        .innerRadius(48)
        .outerRadius(53)
        .startAngle(0)
        .endAngle((length * Math.PI * 2) / 360);

    const generator_ = d3
        .arc() // v4
        .innerRadius(48)
        .outerRadius(48)
        .startAngle(0)
        .endAngle(360);

    svg
        .append("path")
        .attr("d", generator_ as any)
        .attr("fill", "#000")
        .attr("stroke", "black");

    svg
        .append("path")
        .attr("d", generator as any)
        .attr("fill", this.getColorForSoundType())
        .attr("stroke", "black");

    //Lautheit
    const generator3 = d3
        .arc() // v4
        .innerRadius(28)
        .outerRadius(average_loudness)
        .startAngle(0)
        .endAngle(Math.PI * 2);

    svg
        .append("path")
        .attr("d", generator3 as any)
        .attr("fill", this.getColorForSoundType())
        .attr("stroke", "black");

    // Grundkreis
    svg
        .append("circle")
        .style("fill", "#fff")
        .attr("r", 28)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("stroke", "black");

    //Tonheit
    const generator2 = d3
        .arc() // v4
        .innerRadius(26)
        .outerRadius(28)
        .startAngle(0)
        .endAngle(
            (this.features.pitch * 360 * Math.PI * 2) / 360
        );
    svg
        .append("path")
        .attr("d", generator2 as any)
        .attr("fill", "#000")
        .attr("stroke", "black");

    if (rand3 > 0.3) {
      svg
          .append("line")
          .style("stroke", "#000")
          .style("stroke-width", 2)
          .attr("x1", -27)
          .attr("y1", 0)
          .attr("x2", -11)
          .attr("y2", 0);

      svg
          .append("line")
          .style("stroke", "#000")
          .style("stroke-width", 2)
          .attr("x1", 12)
          .attr("y1", 0)
          .attr("x2", 27)
          .attr("y2", 0);
      if (rand3 > 0.6) {
        svg
            .append("line")
            .style("stroke", "#000")
            .style("stroke-width", 2)
            .attr("x1", -19)
            .attr("y1", 20)
            .attr("x2", 19)
            .attr("y2", 20);

        svg
            .append("line")
            .style("stroke", "#000")
            .style("stroke-width", 2)
            .attr("x1", -19)
            .attr("y1", -20)
            .attr("x2", 19)
            .attr("y2", -20);
      }
    }

    if (rand < 0.5) {
      svg
          .append("circle")
          .style("fill", this.getColorForSoundType(true))
          .attr("r", 12)
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("stroke", "black")
          .attr("stroke-width", "2px")
          .attr("stroke-dasharray", rand2 < 0.5 ? "0, 0" : "2, 2");
    } else {
      svg
          .append("rect")
          .attr("x", -12)
          .attr("y", -12)
          .attr("width", 24)
          .attr("height", 24)
          .attr("stroke", "black")
          .attr("stroke-width", "2px")
          .attr("stroke-dasharray", rand2 < 0.5 ? "0, 0" : "2, 2")
          .attr("fill", this.getColorForSoundType(true));
    }

    if (rand4 < 0.3) {
      svg
          .append("line")
          .style("stroke", "#fff")
          .style("stroke-width", 2)
          .attr("x1", -10)
          .attr("y1", 0)
          .attr("x2", 10)
          .attr("y2", 0);
    } else if (rand4 >= 0.3 && rand4 < 0.6) {
      svg
          .append("line")
          .style("stroke", "#fff")
          .style("stroke-width", 2)
          .attr("x1", -10)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", -5);

      svg
          .append("line")
          .style("stroke", "#fff")
          .style("stroke-width", 2)
          .attr("x1", 0)
          .attr("y1", -5)
          .attr("x2", 10)
          .attr("y2", 0);
    } else {
      svg
          .append("line")
          .style("stroke", "#fff")
          .style("stroke-width", 2)
          .attr("x1", -10)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", -10);

      svg
          .append("line")
          .style("stroke", "#fff")
          .style("stroke-width", 2)
          .attr("x1", 0)
          .attr("y1", -10)
          .attr("x2", 10)
          .attr("y2", 0);
    }
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
