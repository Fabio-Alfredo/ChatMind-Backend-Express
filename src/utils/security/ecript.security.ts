import cripto from "crypto";
import { currentEnv } from "../../configs/config";

export const generateHash = (plainText: string): string => {
    //crea un vector de 16 bytes aleatorio
    const iv = cripto.randomBytes(16).toString("hex");
    //crea un objeto de cifrado con el algoritmo aes-256-ocb
    const cipher = cripto.createCipheriv("aes-256-ocb", currentEnv.encryptKey, iv, { authTagLength: 16 });
    //cifra el texto plano y lo convierte a hex
    let cipherText = cipher.update(plainText, "utf8", "hex");
    //finaliza el cifrado y lo convierte a hex
    cipherText += cipher.final("hex");
    //obtiene la etiqueta de autenticación y la convierte a hex
    const tag = cipher.getAuthTag().toString("hex");
    //retorna el iv, el texto cifrado y la etiqueta de autenticación separados por :
    return `${iv}:${cipherText}:${tag}`;
};

export const compareHash = (cryptText: string): string => {
    //separa el texto cifrado en iv, texto cifrado y etiqueta de autenticación
    const decipher = cripto.createDecipheriv("aes-256-ocb", currentEnv.encryptKey, cryptText.split(":")[0], { authTagLength: 16 });
    //decifra el texto cifrado y lo convierte a utf8
    decipher.setAuthTag(Buffer.from(cryptText.split(":")[2], "hex"));
    //decifra el texto cifrado y lo convierte a utf8
    let decryptedText = decipher.update(cryptText.split(":")[1], "hex", "utf8");
    //finaliza el cifrado y lo convierte a utf8
    decryptedText += decipher.final("utf8");
    //retorna el texto plano
    return decryptedText;
};

