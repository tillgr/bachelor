<template> 
    <BasicPlayButton @clicked="click()" :isActive="isActive" :isPlaying="isPlaying"></BasicPlayButton>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";

import BasicPlayButton from '@/components/ui/BasicPlayButton.vue';
import {context, setContext, Player, Volume, BasicPlaybackState, ToneAudioBuffer} from "tone";

@Component({
    components:{
        BasicPlayButton
    }
})
export default class AudioPlayer extends Vue {
    @Prop({default:true}) isActive!:boolean;
    @Prop({default:false}) isAutoplay!:boolean;
    @Prop({default:""}) source!:string;

    ctx = {} as AudioContext;
    player = {} as Player;
    volume = {} as Volume;
    isPlaying = false;
    
   
    mounted(){
        if(this.source){
            this.ctx = new window.AudioContext();
            setContext(this.ctx);
            this.createPlayer();  
        }
    };
   
    playerState():string{
        return this.player.state;
    };

    
    getContext():any {
        return this.ctx;
    }


    createPlayer(){
        const url = "http://localhost:3001/";
        
        this.player = new Player(url + this.source, () => {
            this.$emit('audioBuffer', this.player.buffer);
            if(this.isAutoplay) {
                this.isPlaying = true;
                this.$emit('started');
            }
        });
        this.player.onstop = () => {
            this.isPlaying = false; 
            this.$emit('stopped');
        };

        this.volume = new Volume(-10);
        this.player.connect(this.volume);
        this.player.autostart = this.isAutoplay;
        
        this.volume.toDestination();
        this.$emit("audioNode", this.volume, this.getContext());
    };
    click(){
        if(this.isActive){
            if(this.player.loaded && this.player.state != 'started'){
                this.player.start();
                this.isPlaying = true;
                this.$emit('started');
            }
            else if(this.player.state == 'started'){
                this.isPlaying = false;
                this.player.stop();
                //this.$emit('stopped');
            }
        }
    }

    getPlayerBuffer(): ToneAudioBuffer {
        return this.player.buffer;
    }
    getPlayerState(): BasicPlaybackState {
        return this.player.state;
    }

    @Watch("player")
    playerStateChanged(value:Player,oldValue:Player){
        if(this.isActive && this.isPlaying && value.state == 'stopped'){
            this.isPlaying = false;
            //this.$emit('finished');
        } 
        else if(this.isActive && this.isPlaying) {
            this.$emit('started');
            this.isPlaying = true;
        }
    };
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vars.scss";

    .play_button{
        padding:$basicPadding;
        margin:$basicMargin;
        color:$backgroundColor;
        width:80px;
        height:80px;
        border-radius: 50%;
        display:flex;
        justify-content: center;
        align-items: center;
        text-decoration:none;
        transition:border 0.2s ease;
        transition:background-color 0.5s ease;

        &.active{
            border:2px solid $accentColor;
            color:$accentColor;
            cursor:pointer;
        }
        .active:hover, &.playing{
            background-color: $accentColor;
            color:$backgroundColor;
        }


        &.finished{
            color:$backgroundColor;
            background-color:$textDescriptionColor;
        }

        .material-icons{
            font-size:$iconFontSize;
        }
    }
</style>