


export default ({store, app:{$axios}}) =>{
        if(store.state.auth.authStatus){
            console.log('axios plugin')
            $axios.setToken(store.state.auth.token, 'Bearer');
        }
  }