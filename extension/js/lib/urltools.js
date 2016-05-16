URLTools = class URLTools {
    static endsWith(token){
        return window.location.pathname.substr(0-token.length) == token
    }
    
    static contains(token){
        return window.location.pathname.indexOf(token) >=0
    }
}