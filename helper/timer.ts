
export default class Timer{

    preCountdown: number;
    countdown: number;
    timePassedCountdown: number;
    timePassedPreCountdown: number;
    customPreCountdownCallback:()=>any;
    customCountdownCallback:()=>any;

    cdInterval: any;
    precdInterval: any;

    constructor(preCountDown:number,countdown:number,customPreCountdownCallback:()=>any,customCountdownCallback:()=>any){
        this.preCountdown = preCountDown;
        this.countdown = countdown;
        this.timePassedCountdown = 0;
        this.timePassedPreCountdown = 0;
        this.customPreCountdownCallback = customPreCountdownCallback;
        this.customCountdownCallback = customCountdownCallback;
    };

    startPreCountdown(){
        if(this.preCountdown != 0){
            this.precdInterval = setInterval(()=>{
                this.timePassedPreCountdown++;
                if(this.preCountdown === this.timePassedPreCountdown){
                    this.preCountdownCallback();
                    this.customPreCountdownCallback();
                    clearInterval(this.precdInterval);
                };
            }, 1000);
        }
        else{
            console.log("preCountdown not set, check timer in mixins");
            this.startCountdown();
        }
    };

    preCountdownCallback(){
        this.startCountdown();
    };

    startCountdown(){
        if(this.countdown != 0){
            this.cdInterval = setInterval(()=>{
                this.timePassedCountdown++;
                if(this.countdown === this.timePassedCountdown){
                    this.customCountdownCallback()
                    clearInterval(this.cdInterval);
                }    
            }, 1000)
        }
        else{
            console.log("countdown not set, check timer in mixins")
        }
    }

    resetPreCountdown(millisec:number){
        this.preCountdown = millisec;
    };
    resetCountdown(millisec:number){
        this.countdown = millisec;
    };
    resetTimer(){
        clearInterval(this.precdInterval);
        clearInterval(this.cdInterval);
        this.timePassedCountdown = 0;
        this.timePassedPreCountdown = 0;
    };
}