
import Meyda from "meyda";

export interface IAudioFeatures {
    loudness:   number,
    pitch:      number,
    brightness: number,
    sharpness:  number,
    // roughness:  number,
    richness:   number,
    pitchiness: number,
    chroma:     Array<number>
}

export default class AudioAnalyzer {

    private analyzer = {} as Meyda.MeydaAnalyzer;
    private callback: (features: IAudioFeatures) => void;

    numberOfMFCCCoefficients = 40;
    windowSize  = 1024;
    halfWS      = this.windowSize * 0.5;
    invHWS      = 1.0 / this.halfWS;

    constructor() {//, callback: (features: IAudioFeatures) => any) {
        this.callback = (f) => { 
            //console.log(f.pitch)
        };
        //this.init(source, context);
    }
    init(source: AudioNode, context: AudioContext) {
        this.analyzer = Meyda.createMeydaAnalyzer({
            "audioContext": context,
            "source": source,
            "bufferSize": this.windowSize,
            "numberOfMFCCCoefficients": this.numberOfMFCCCoefficients,
            "featureExtractors": ["loudness","perceptualSharpness","perceptualSpread","spectralCentroid","powerSpectrum","spectralKurtosis","chroma"],
            "callback": (f) => { this.onFeatures(f); }
        });
    }

    start() {
        this.analyzer.start();
    }
    stop() {
        this.analyzer.stop();
    }
    setSource(source: AudioNode) {
        this.analyzer.setSource(source);
    }
    extract(buffer: Float32Array): IAudioFeatures{

        let features = [];
        let WS = Meyda.bufferSize;
        let hop = WS * 0.25;
        for (let i = 0; i < buffer.length - WS; i += hop) {
            const r = Meyda.extract(
                ["loudness","perceptualSharpness","perceptualSpread","spectralCentroid","powerSpectrum","spectralKurtosis","chroma"], 
                Meyda.windowing(buffer.slice(i, i + WS), "hanning")
            );
            features.push(r)
        }
        let avg = {loudness:{total:0}, perceptualSharpness:0, perceptualSpread:0, spectralCentroid:0, powerSpectrum:new Float32Array((features[0] as any).powerSpectrum.length), chroma:new Array<number>(12), spectralKurtosis:0};
        avg.chroma = [0,0,0,0,0,0,0,0,0,0,0,0];
        features.forEach((f: any) => {
            avg.loudness.total = avg.loudness.total + f.loudness.total;
            avg.perceptualSharpness = avg.perceptualSharpness + f.perceptualSharpness;
            avg.perceptualSpread = avg.perceptualSpread + f.perceptualSpread;
            avg.spectralCentroid = avg.spectralCentroid + f.spectralCentroid;
            avg.powerSpectrum = avg.powerSpectrum.map(function (num, idx) {
                return num + f.powerSpectrum[idx];
            });
            avg.chroma = avg.chroma.map(function (num, idx) {
                return num + f.chroma[idx];
            });
            avg.spectralKurtosis = avg.spectralKurtosis + f.spectralKurtosis;
        });
        avg.loudness.total      = avg.loudness.total        / features.length;
        avg.perceptualSharpness = avg.perceptualSharpness   / features.length;
        avg.perceptualSpread    = avg.perceptualSpread      / features.length;
        avg.spectralCentroid    = avg.spectralCentroid      / features.length;
        for(var i = 0; i < avg.powerSpectrum.length; i++) {
            avg.powerSpectrum[i] = avg.powerSpectrum[i] / features.length;
        }
        for(var i = 0; i < avg.chroma.length; i++) {
            avg.chroma[i] = avg.chroma[i] / features.length;
        }
        avg.spectralKurtosis = avg.spectralKurtosis / features.length;

        return this.processFeatures(avg);
    }


    setFeatureCallback(callback: (features: any) => void) {
        this.callback = callback;
    }

    clamp(value:number, min:number, max:number) : number {
        return Math.max(min, Math.min(max, value));
    }

    onFeatures(features: any) {
        this.callback(this.processFeatures(features));
    }

    processFeatures(features: any): IAudioFeatures {
        let f = {} as IAudioFeatures;

        f.loudness      = features.loudness.total / 24.0; // / 55.0 
        f.loudness      = Math.max(0.0,Math.min(1.0, f.loudness));

        f.pitch = 0;
        let highestVal = 0;
        features.powerSpectrum.forEach((val:number, i:number) => {
            if(val > highestVal) {
                f.pitch = i;
                highestVal = val;
            }
        });
        // pseudo "to log-space"
        f.pitch         = f.pitch + 6; // hacky, avoiding x < 1 in log(x)
        let preNorm     = 1.0 / ((features.powerSpectrum.length + 6) * 0.01);
        let postNorm    = 1.0 / Math.log10(100);
        
        f.pitch = Math.max(f.pitch * preNorm, 1.0);
        f.pitch = Math.log10(f.pitch) * postNorm;

        f.chroma        = features.chroma;

        f.brightness    = features.spectralCentroid * this.invHWS;
        f.sharpness     = features.perceptualSharpness;
        f.richness      = features.perceptualSpread;
        f.pitchiness    = features.spectralKurtosis; //+ 85) / 6800;

        return f;
    }
}