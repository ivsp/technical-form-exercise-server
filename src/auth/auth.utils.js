import crypto from "crypto";

// creo una clave para la codificación
const { SECRET } = process.env;

/**
 * Esta función codifica la password que recibe como parámetro y la devuelve
 */
export const encodePassword = (pass) => {
  // utilizamos la librería crypto para codificarla haciendo uso de 1000 iteraciiones

  /**
   * FUNCIÓN pbkdf2Sync
   * Provides a synchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation. A selected HMAC digest algorithm specified
   * is applied to derive a key of the requested byte length (keylen) from the password, salt and iterations.
   * @password {<string> | <Buffer> | <TypedArray> | <DataView>} : Password
   * @salt {<string> | <Buffer> | <TypedArray> | <DataView>} : It must be as unique as possible. However, it is recommended that a salt is arbitrary and in any case, it is at least 16 bytes long.
   * @iterations {<number>} : It must be a number and should be set as high as possible. So, the more is the number of iterations, the more secure the derived key will be, but in that case, it takes a greater amount of time to complete.
   * @keylen {<number>} : It is the key of the required byte length and it is of type number.
   * @digest {<string>} : It is a digest algorithm of string type. MD5, SHA-1, SHA-224, SHA-256, SHA-384, and SHA-512.
   * https://nodejs.org/api/crypto.html
   * https://es.acervolima.com/hash-sha-512-en-java/
   * https://www.tutorialspoint.com/crypto-pbkdf2sync-method-in-node-js
   * @returns synchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation. A selected HMAC digest algorithm specified
   * is applied to derive a key of the requested byte length (keylen) from the password, salt and iterations.
   */
  //Convert it to a string with hexadecimal encoding
  return crypto.pbkdf2Sync(pass, SECRET, 1000, 64, `sha512`).toString(`hex`);
};
