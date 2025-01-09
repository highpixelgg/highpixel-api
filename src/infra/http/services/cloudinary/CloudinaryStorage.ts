import { v2 as cloudinary } from 'cloudinary';
import { imageToDataURI } from "infra/http/helpers/cloudinary-helper";

// export const cloudinaryUpload = async (image: Express.Multer.File) => {
//   const imageData = imageToDataURI(image);

//   const uploadedResponse = await cloudinary.uploader.upload(imageData, {
//     upload_preset: "lowracing",
//     timeout: 30000, // 30s
//   });

//   return {
//     public_id: uploadedResponse.public_id,
//     url: uploadedResponse.secure_url,
//   };
// };

export const cloudinaryUpload = async (image: Express.Multer.File, folder: string) => {
  const imageData = imageToDataURI(image);

  const uploadedResponse = await cloudinary.uploader.upload(imageData, {
    upload_preset: "lowracing",
    timeout: 30000, // 30s
    public_id: `${folder}/${image.originalname}`,
  });

  return {
    public_id: uploadedResponse.public_id,
    url: uploadedResponse.secure_url,
  };
};

export const cloudinaryDelete = async (public_id: string) => {
  await cloudinary.uploader.destroy(public_id);
};
