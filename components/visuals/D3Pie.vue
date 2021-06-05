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
import {defaultArg} from "tone";

@Component({
  components: {
    BasicCard,
    BasicRow,
    BasicButton,
  },
})
export default class D3Glyph extends Vue {
  @Prop({default: ""}) name!: string;
  @Prop({default: ""}) label!: string;
  @Prop({default: 3}) length!: number;
  @Prop({
    default: () => {
      return {
        loudness: 0.5,
        richness: 0.5,
        pitch: 0.5,
        brightness: 0.5,
        sharpness: 0.5,
        pitchiness: 0.5
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

    const svg = d3
        .select("#mir-" + this.name)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    svg
        .append("g")
        .attr("transform", "translate(105, 105)")
        .style("transform", `translate(50%, 50%)`);

    const g = svg.selectAll("g");

    // Radius der Glyphe
    let radius = 200;

    // Daten-Array für D3
    let data = [
      {name: "loudness", value: ''},
      {name: "richness", value: ''},
      {name: "pitch", value: ''},
      {name: "brightness", value: ''},
      {name: "sharpness", value: ''},
      {name: "dissonance", value: ''},
    ];
    //console.log(data)

    //Daten aus dem Analyzer in den Array eintragen
    for (let obj of data){
      this.features[obj.name] !== undefined ?
          obj['value'] = this.features[obj.name] : obj['value'] = 1;
    }

    //Farbskala
    let colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['darkblue', 'lightblue']);

    //Pie Generator mit gleich großen Anteilen für alle Größen
    let pie = d3.pie().value(1);

    //Arc Generator für das erstellen der Pfade
    let arc = g.selectAll("arc")
        .data(pie(data))
        .enter();

    // Pfade erstellen
    let path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return colorScale(d.data['value']); });

    //Erstellte Pfade selektieren
    let paths = g.selectChildren()._groups[0];
    //Skalieren der Teile der Glyphe
    for (let i = 0; i < paths.length; i++) {
      paths[i].setAttribute("style", `transform:scale(${data[i].value}, ${data[i].value})`);
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
