const crypto = require('crypto');
require('dotenv').config()

const algorithm = 'aes-256-cbc';
 
const key = process.env.SECRET_KEY
 
function encrypt(text) {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
}
 
 
function decrypt(textiv,encryptedData) {
    let iv = Buffer.from(textiv, 'hex');
    let encryptedText = Buffer.from(encryptedData, 'hex');
 
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
 
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
 
    return decrypted.toString();
}
 
module.exports={encrypt,decrypt}