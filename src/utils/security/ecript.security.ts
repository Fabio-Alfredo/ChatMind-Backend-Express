import cripto from "crypto";
import { currentEnv } from "../../configs/config";

export const generateHash = (plainText: string): string => {
    //crea un vector de 16 bytes aleatorio
    const iv = cripto.randomBytes(16);
    //crea un objeto de cifrado con el algoritmo aes-256-ocb    
    const cipher = cripto.createCipheriv("aes-256-cbc", currentEnv.encryptKey, iv);
    //cifra el texto plano y lo convierte a hex
    let cipherText = cipher.update(plainText, "utf8", "hex");
    //finaliza el cifrado y lo convierte a hex
    cipherText += cipher.final("hex");
    //retorna el iv, el texto cifrado y la etiqueta de autenticación separados por :
    return iv.toString() + cipherText.toString();
};

export const compareHash = (cryptText: string): string => {
    //separa el iv, el texto cifrado y la etiqueta de autenticación
    const [iv, cipherText] = cryptText.split(":");
    //crea un objeto de descifrado con el algoritmo aes-256-ocb
    const decipher = cripto.createDecipheriv("aes-256-ocb", currentEnv.encryptKey, Buffer.from(iv, "hex"));
    //descifra el texto cifrado y lo convierte a utf8
    let plainText = decipher.update(cipherText, "hex", "utf8");
    //finaliza el descifrado y lo convierte a utf8
    plainText += decipher.final("utf8");
    return plainText;
};

