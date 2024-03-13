const crypto = require('crypto');
const CryptoJS = require("crypto-js");

const algorithm = 'aes-256-cbc';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = '2fd35b649c50a6855f1a7750fe6cdfac';//crypto.randomBytes(16);

// new key 
const secretKey_for_html = '_JSQt4Qnf;,dCvlHCcGn;ceJJ';


const encrypt = (text) => {
    if(text){
    text = text.toString() ;
    // text = btoa( text );
        const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return encrypted.toString('hex');
    }
    else{
        return text;
    }
};

const decrypt = (text) => {
    if(text){
        try {
            const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

            const decrpyted = Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()]);

            return ( decrpyted.toString() );
            
        } catch (error) {
            
            return null;
        }
        
    }
    else{
        return text;
    }
};

const decryptHtml = (text)=>{
    if(text){
        let  bytes  = CryptoJS.AES.decrypt(text,secretKey_for_html);
        if(bytes){
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            if(originalText){
                return originalText;
            }
        }
    }
}

module.exports = {
    encrypt,
    decrypt,
    decryptHtml,
};