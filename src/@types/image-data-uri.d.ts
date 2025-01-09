declare module "image-data-uri" {
  function encode(data: Buffer, mediaType: string): string;
  function decode(uri: string): Buffer;
  export = { encode, decode };
}
