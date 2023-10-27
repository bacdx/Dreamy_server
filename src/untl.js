 const base64toBolb=(base64)=> {
   
const byteArray = atob(base64);
return new Blob([byteArray], {type: 'text/plain'})
}


const bytetoBase64=(bytes)=> {
    const decoder = new TextDecoder();
    return  decoder.decode(bytes);
    
    }
const getKey=(obj,name)=>{
Object.keys.forEach(key=>{
    if(key==name){
        return name;
    }
})
return null;
}

module.exports={bytetoBase64,base64toBolb,getKey};


