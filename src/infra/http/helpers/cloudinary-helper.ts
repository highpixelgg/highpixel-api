import imageDataUri from "image-data-uri";

export const imageToDataURI = (image: Express.Multer.File): string => {
  const dataBuffer = Buffer.from(image.buffer);
  const mediaType = image.mimetype.replace("/image", "");
  const imageData = imageDataUri.encode(dataBuffer, mediaType);
  return imageData;
};