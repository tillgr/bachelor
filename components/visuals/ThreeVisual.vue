
<template>
    <div @click="$emit('click', id)" ref="canvas">
        {{features.loudness}}
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Renderer3D, { IRenderable } from "@/helper/renderer/renderer";
import Scene  from "@/helper/renderer/scene"; // ExampleScene
import { IAudioFeatures } from "~/helper/audioAnalyzer";

@Component
export default class ThreeVisual extends Vue {
    @Prop({default:-1}) id!:number;
    @Prop({default:()=>{return {loudness:0,pitch:0,brightness:0,richness:0,pitchiness:0,sharpness:0} as IAudioFeatures}}) features!: IAudioFeatures;

    renderer = {} as Renderer3D;

    mounted() {
        console.log(this.$refs.canvas );

        this.renderer = new Renderer3D( this.$refs.canvas as HTMLCanvasElement );

        let scene: Scene = new Scene(); // ExampleScene
        console.log(this.renderer);

        this.renderer.setActiveScene(scene);

        this.renderer.run();

    }

    @Watch('features', {deep:true})
    onFeature(value:IAudioFeatures, oldValue:IAudioFeatures) {
        console.log("got new features", value);
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/vars.scss";

div {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

</style>
