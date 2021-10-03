<template>

  <article class="container">
    <section class="landing">
      <div class="title">
        <h1>Example - {{ features.loudness }}</h1>
        <AudioPlayer :source="'./max/9aa2b1e0_raspiness.wav'" :isAutoplay="true" @audioBuffer="onAudioBuffer" @audioNode="onAudioNode"
                     @started="onAudioStart" @stopped="onAudioStop"></AudioPlayer>
      </div>
      <div class="container">
<!--        <template v-for="currentType in GlyphTypes">-->
          <component v-for="(features, index) in permutatedFeatures"
                     v-bind:is="$data._currentType"
                     :id="$data._currentType + '-' + index"
                     :key="$data._currentType + '-' + index"
                     :name="$data._currentType + '-' + index"
                     :features="features"
                     @click="(id)=>{onClick(id)}"
                     class="box">
          </component>
<!--        </template>-->
      </div>
    </section>
  </article>

</template>

<script lang="ts">

import {Component, Vue} from "nuxt-property-decorator"

import BasicOverlay from '@/components/ui/BasicOverlay.vue'
import BasicRow from '@/components/ui/BasicRow.vue'
import BasicCard from '@/components/ui/BasicCard.vue'
import BasicButton from '@/components/ui/BasicButton.vue'
import BasicContainer from '@/components/ui/BasicContainer.vue'

import D3Glyph from '~/components/visuals/D3Glyph.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import AudioAnalyzer, {IAudioFeatures} from '@/helper/audioAnalyzer'
import {ToneAudioBuffer} from "tone"
import D3Pie from "~/components/visuals/D3Pie.vue";
import D3GlyphMix from "~/components/visuals/D3GlyphMix.vue";
import {PermutationMode} from "~/helper/permutationMode"

@Component({
  components: {
    D3Pie,
    D3GlyphMix,
    D3Glyph,
    BasicOverlay, BasicCard, BasicRow, BasicContainer, BasicButton,
    AudioPlayer
  },
  middleware: [
    //'login'
  ]
})

export default class Main extends Vue {

  set currentType(value: string) {
    this._currentType = value;
  }
  set stepCount(value: number) {
    this._stepCount = value;
  }
  set currentPermutationMode(value: PermutationMode) {
    this._currentPermutationMode = value;
  }
  set featureIndex(value: number) {
    this._featureIndex = value;
  }

  analyzer = {} as AudioAnalyzer;
  features = {pitch: 0, brightness: 0, loudness: 0, sharpness: 0, richness: 0, pitchiness: 0} as IAudioFeatures;
  GlyphTypes = ['D3Glyph', 'D3GlyphMix', 'D3Pie'];


  //Variablen für jedes Test Setting
  private _currentType: string = 'D3GlyphMix';
  private _stepCount: number = 5;
  private _currentPermutationMode: PermutationMode = PermutationMode.single;
  private _featureIndex = 3; //0...4


  permutationKey = Object.keys(this.features)[this._featureIndex];
  permutatedFeatures: IAudioFeatures[] = [];

  created() {
  }

  mounted() {
  }

  onClick(id: number) {
    console.log("clicked", id);
  }


  onAudioBuffer(buffer: ToneAudioBuffer) {
    this.analyzer = new AudioAnalyzer();
    this.features = this.analyzer.extract(buffer.getChannelData(0)); // offline-analyser

    console.log(this.features)

    if (this.$data._currentPermutationMode === PermutationMode.all){
      this.permutatedFeatures = this.permutateAllFeatures();
    }
    else this.permutatedFeatures = this.permutateSingleFeature()

  }

  onAudioNode(node: AudioNode, context: any) {
    // this.analyzer = new AudioAnalyzer();
    // this.analyzer.init(node, context); // online-analyser
    // this.analyzer.setFeatureCallback((f)=>{ this.features = f; }); // online-analyser
  }

  onAudioStart() {
    // this.analyzer.start(); // online-analyser
  }

  onAudioStop() {
    //this.analyzer.stop(); // online-analyser
  }

  permutateAllFeatures(){
    let permutations: IAudioFeatures[] = [this.features];

    for (let i = 0; i <this.$data._stepCount-1; i++){
      let currentObject = permutations[i];

      let permutation = {...currentObject};
      for (let key in permutation){
        (permutation as any)[key] = ((permutation as any)[key] + (1/this.$data._stepCount)) % 1;
      }

      permutations[i+1] = permutation;
    }
    //console.log(permutations)
    return this.shuffle(permutations);
  }

  permutateSingleFeature(){
    let key = this.permutationKey
    let permutations: IAudioFeatures[] = [this.features];

    for (let i = 0; i <this.$data._stepCount-1; i++){
      let currentObject = permutations[i];

      let permutation = {...currentObject};
      (permutation as any)[key] = ((permutation as any)[key] + (1/this.$data._stepCount)) % 1;

      permutations[i+1] = permutation;
    }
    //console.log(permutations)
    return this.shuffle(permutations);
  }

  shuffle(array:any[]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


}

</script>

<style lang="scss" scoped>
@import "~/assets/style/vars.scss";

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .landing {
    width: 100%;
    height: 100%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .box {
      width: 250px;
      height: 250px;
      // margin: $basicMargin;
    }

    .title {
      //width:80%;
      padding: $edgePadding;
      align-self: center;

      background-color: $backgroundColor;

      h1 {
        display: block;
        margin-bottom: $edgePadding * 0.5;
      }

      p {
        margin: 0 0;
        padding: 0px $edgePadding 0px $edgePadding;
        display: inline-block;
        font-weight: 200;
      }
    }
  }
}


</style>
