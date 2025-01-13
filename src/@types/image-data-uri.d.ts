declare module "image-data-uri" {
  export function encode(data: Buffer, mediaType: string): string;
  export function decode(uri: string): { data: Buffer; mediaType: string };
  export = { encode, decode };
}
