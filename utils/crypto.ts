export { scrypt as utilScrypt } from "@noble/hashes/scrypt";
export { randomBytes as utilRandomBytes } from "@noble/hashes/utils";

export const utilUint8ArrayToHex = (arr: Uint8Array): string => {
  return Array.from(arr, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const utilHexToUint8Array = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0) throw new Error("Hex string must have an even length");
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) arr[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  return arr;
}

export const utilTimeSafeEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a[i] ^ b[i];
  return result === 0;
}

export const utilRandomUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
