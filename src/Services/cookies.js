const TOKEN_NAME = 'gi_tvs';

export default{
    setToken(token){
        localStorage.setItem(TOKEN_NAME, token);
    },
    getToken(){
        return localStorage.getItem(TOKEN_NAME);
    },

    deleteToken(){
         localStorage.removeItem(TOKEN_NAME);
    }

};