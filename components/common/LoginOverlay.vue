<template>
    <BasicOverlay>
        <BasicCard>
            <p class="caption_text" v-if="!loginError">
                Login
            </p>
            <p class="caption_text error" v-if="loginError">Login Error. Please try again</p>
            <BasicRow  borderRadiusTop="true">
               <p class="caption_text">username</p>
            </BasicRow>
            <BasicRow darken="true">
               <BasicInput v-model="username"></BasicInput>
            </BasicRow>
             <BasicRow>
               <p class="caption_text">password</p>
            </BasicRow>
             <BasicRow darken="true">
               <BasicInput type="password" v-model="password"></BasicInput>
            </BasicRow>
            <BasicRow borderRadiusBottom="true">
                <BasicButton arrow_icon="true" :active="!error()" @click="submit()"></BasicButton>
            </BasicRow>
        </BasicCard>
    </BasicOverlay>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"

import BasicOverlay from '@/components/ui/BasicOverlay.vue'
import BasicCard from '@/components/ui/BasicCard.vue'
import BasicRow from '@/components/ui/BasicRow.vue'
import BasicButton from '@/components/ui/BasicButton.vue'
import BasicInput from '@/components/ui/BasicInput.vue'

@Component ({
    components: {
        BasicOverlay,
        BasicCard,
        BasicRow,
        BasicButton,
        BasicInput
    },
})
export default class LoginOverlay extends Vue {
    
    password = '';
    username = '';
    loginError = false;

    error():Boolean{
        if(this.password == '' || this.username == '')
            return true;
        else
            return false;
    };
    submit(){
        this.login().then((res:Boolean)=>{
            if(res){
                
            }else{
                this.loginError = true;
                this.password = '';
                this.password = '';
            }
        })
    }
    async login():Promise<Boolean>{
        return new Promise((res,rej)=>{
            this.$store.dispatch("auth/login",{username:this.username,password:this.password}).then((response)=>{
                res(true);
            }).catch((error)=>{
                console.log("Login Error", error);
                res(false);
            });
        })
    }
}

</script>

<style lang="scss" scoped>
@import "~/assets/style/vars.scss";


.error{
    color:$accentColor;
}

</style>
