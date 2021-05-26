
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

@Module({
    name: 'Auth',
    stateFactory: true,
    namespaced: true,
})
export default class Auth extends VuexModule{

    authStatus = false;
    username = '';
    token = '';
    role = '';
  
    @Mutation
    authSuccess(auth:any){
        this.authStatus = true;
        this.username = auth.username;
        this.token = auth.token;
        this.role = auth.role;
    };

    @Mutation
    authDenied(){
        this.authStatus = false;
        this.username = '';
        this.token = '';
        this.role = '';
    };

    @Action
    async login(user:{username:string,password:string}):Promise<any>{
        return await $axios.post('/auth/local',{
            identifier:user.username,
            password:user.password
        }).then((res:any)=>{
            if(res.status == 200){
                const token = res.data.jwt as string;
                $axios.setToken(token,'Bearer')
                this.context.commit("authSuccess",{username:user.username,token:token,role:res.data.user.role.type});
            }}).catch(error => {
                return null;
            });
    }
};
