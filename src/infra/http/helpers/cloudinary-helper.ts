import imageDataUri from "image-data-uri";

export const mediaToDataURI = (media: Express.Multer.File): string => {
  const dataBuffer = Buffer.from(media.buffer);
  const mediaType = media.mimetype; 
  const dataURI = imageDataUri.encode(dataBuffer, mediaType);

  return dataURI;
};