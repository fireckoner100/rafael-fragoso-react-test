import CryptoJS from 'crypto-js';

export const encryptData = (data: unknown): string => {
  const key = import.meta.env.VITE_SECRET_KEY;
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decryptData = (cipherText: string): any => {
  const key = import.meta.env.VITE_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
