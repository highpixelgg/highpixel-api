import { Storage } from '@infra/http/libs/cloudinary/storage';
import { v2 as cloudinary } from 'cloudinary';
import { imageToDataURI } from "infra/http/helpers/cloudinary-helper";

Storage();

export const cloudinaryUpload = async (asset: Express.Multer.File, folder: string) => {
  const imageData = imageToDataURI(asset);

  const uploadedResponse = await cloudinary.uploader.upload(imageData, {
    upload_preset: "lowracing",
    timeout: 30000, // 30s
    public_id: `${folder}/${asset.originalname}`,
  });

  return {
    public_id: uploadedResponse.public_id,
    url: uploadedResponse.secure_url,
  };
};

export const cloudinaryDelete = async (assetUrl: string) => {
  const splitPublicId = assetUrl.split('/avatars/').pop();
  console.log(splitPublicId);
  const getPublicId = splitPublicId[1].split('.')[0];
  console.log(getPublicId)
  const deleteImage = await cloudinary.uploader.destroy(getPublicId);  
  console.log(deleteImage);
};
