import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name:'Route',
  stateFactory:true,
  namespaced:true
})
export default class Route extends VuexModule{

  redirectFrom = '';
  
  @Mutation
  setRedirectFrom(from:string){
    this.redirectFrom = from;
  };

  @Mutation
  deleteRedirectFrom(){
    this.redirectFrom = '';
  };
}