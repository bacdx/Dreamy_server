 const base64toBolb=(base64)=> {
   
const byteArray = atob(base64);
return new Blob([byteArray], {type: 'text/plain'})
}


const blobtoBase64=(blob)=> {
    const decoder = new TextDecoder();
    return  decoder.decode(blob);
    
    }
module.exports={blobtoBase64,base64toBolb};


