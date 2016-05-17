URLTools = class URLTools {
    static endsWith(token){
        return window.location.pathname.substr(0-token.length) == token
    }
    
    static contains(token){
        return window.location.pathname.indexOf(token) >=0
    }
    
    static getQuery(){
        let q={}
        if(window.location.search) window.location.search.replace(/^\?/,'').split('&').map((qp)=>{let qa=qp.split('=');q[qa[0]]=qa[1]})
        return q
    }
    
    static object2kvp(obj){
        let kvp=[]
        for(let k in obj){
            kvp.push(`${k}=${obj[k]}`)
        }
        return kvp.join('&')
    }
    
    static makeUrlQuery(obj,removeKeys=[]){
       let oq=URLTools.getQuery()
       let q={}
       for(let k in oq){
           if(removeKeys.indexOf(k)==-1){
            q[k]=oq[k]
           }
       }
       for(let k in obj){
           if(removeKeys.indexOf(k)==-1){
            q[k]=obj[k]
           }
       }
       let l=document.location
       let qry=`${URLTools.object2kvp(q)}`
       if(qry)qry=`?${qry}`
       return `${l.origin}${l.pathname}${qry}${l.hash}`;
    }
}