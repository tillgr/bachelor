<template>

    <article class="container">
      <section class="landing">
        <div class="title">
          <h1>Example - {{features.loudness}}</h1>
          <AudioPlayer :source="'A_1.wav'" :isAutoplay="true"  @audioBuffer="onAudioBuffer" @audioNode="onAudioNode" @started="onAudioStart" @stopped="onAudioStop"></AudioPlayer>
        </div>
        <div class="container">
          <D3Glyph v-for="i in 3" :key="i" :id="i" :name="i"  :features="features"   @click="(id)=>{onClick(id)}" class="box"></D3Glyph>
        </div>
      </section>
    </article>

</template>

<script lang="ts">

import { Component, Vue } from "nuxt-property-decorator"

import BasicOverlay from '@/components/ui/BasicOverlay.vue'
import BasicRow from '@/components/ui/BasicRow.vue' 
import BasicCard from '@/components/ui/BasicCard.vue'
import BasicButton from '@/components/ui/BasicButton.vue'
import BasicContainer from '@/components/ui/BasicContainer.vue'

import D3Glyph from '~/components/visuals/D3Glyph.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import AudioAnalyzer, { IAudioFeatures } from '@/helper/audioAnalyzer'
import { ToneAudioBuffer } from "tone"

@Component ({
    components: {
        BasicOverlay, BasicCard, BasicRow, BasicContainer, BasicButton, D3Glyph,
        AudioPlayer
    },
    middleware: [
        //'login'
    ]
})
export default class Main extends Vue {

    analyzer = {} as AudioAnalyzer;
    features = {loudness:0,pitch:0,brightness:0,richness:0,pitchiness:0,sharpness:0} as IAudioFeatures;

    created() {
    }  

    mounted() { 
    }

    onClick(id: number) {
      console.log("clicked", id);
    }


    onAudioBuffer(buffer:ToneAudioBuffer) {
      this.analyzer = new AudioAnalyzer();
      this.features = this.analyzer.extract(buffer.getChannelData(0)); // offline-analyser
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

}

</script>

<style lang="scss" scoped>
@import "~/assets/style/vars.scss";

.container {
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .landing{
    width:100%;
    height:100%;
    margin-bottom: 50px;
    display:flex;
    flex-direction:column;
    justify-content: center;

    .box {
      width: 400px;
      height: 400px;
      margin: $basicMargin;
    }

    .title{
      //width:80%;
      padding:$edgePadding;
      align-self:center;

      background-color: $backgroundColor;

      h1 {
        display: block;
        margin-bottom: $edgePadding * 0.5;
      }
      p{
        margin: 0 0;
        padding:0px $edgePadding 0px $edgePadding;
        display: inline-block;
        font-weight: 200;
      }
    }
  }
}


</style>
