import { ParametersErrors } from '@core/domain/errors/ParameterErrors';
import { mediaToDataURI } from '@infra/http/helpers/cloudinary-helper';
import { Storage } from '@infra/http/libs/cloudinary/storage';
import { v2 as cloudinary } from 'cloudinary';

Storage();

class CloudinaryUploadService {
  private static uploadConfig = {
    avatar: {
      preset: "avatars",
    },
    banner: {
      preset: "banners",
    },
    post: {
      preset: "posts",
    },
  };

  private async uploadFile(asset: Express.Multer.File, type: keyof typeof CloudinaryUploadService.uploadConfig) {
    const config = CloudinaryUploadService.uploadConfig[type];
    const imageData = mediaToDataURI(asset);

    const uploadedResponse = await cloudinary.uploader.upload(imageData, {
      upload_preset: config.preset,
      timeout: 30000, // 30s
      public_id: asset.originalname.split('.')[0],
    });

    return {
      public_id: uploadedResponse.public_id,
      url: uploadedResponse.secure_url,
    };
  }

  public async uploadAvatar(asset: Express.Multer.File) {
    return this.uploadFile(asset, "avatar");
  }

  public async uploadBanner(asset: Express.Multer.File) {
    return this.uploadFile(asset, "banner");
  }

  public async uploadPost(asset: Express.Multer.File) {
    return this.uploadFile(asset, "post");
  }
}

class CloudinaryDeleteService {
  private static deleteConfig = {
    avatar: {
      preset: "avatars",
    },
    banner: {
      preset: "banners",
    },
    post: {
      preset: "posts",
    },
  };

  private async delete(publicId: string, type: keyof typeof CloudinaryDeleteService.deleteConfig) {
    try {
      const deleteResponse = await cloudinary.uploader.destroy(publicId);

      if (deleteResponse.result !== "ok") {
        throw new Error(`Failed to delete ${type}: ${deleteResponse.result}`);
      }

      return {
        result: deleteResponse.result,
      };
    } catch (error) {
      throw new ParametersErrors(`Error deleting ${type}: ${error.message}`);
    }
  }

  public async deleteAvatar(publicId: string) {
    return this.delete(publicId, "avatar");
  }

  public async deleteBanner(publicId: string) {
    return this.delete(publicId, "banner");
  }

  public async deletePost(publicId: string) {
    return this.delete(publicId, "post");
  }
}

export { CloudinaryDeleteService, CloudinaryUploadService };