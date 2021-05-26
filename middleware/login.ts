export default async function({store}:any){
    if(!store.state.auth.authStatus)
        await store.dispatch("auth/login",{username:'public',password:'nurkenner'});
}