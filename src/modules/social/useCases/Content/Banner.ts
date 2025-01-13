import { uploadConfig } from "@config/upload-config";
import { getMimeTypeAndExtensionFromBase64 } from "@utils/getMimeType";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { CloudinaryDeleteService, CloudinaryUploadService } from "infra/http/services/cloudinary/CloudinaryStorage";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";

type ContentAvatarRequest = {
  file: Express.Multer.File;
  id: string;
};

type FileResponse = {
  file: string;
};

type ContentAvatarResponse = Either<ParametersErrors, FileResponse>;

export class ContentBanner {
  constructor(
    private usersRepository: IUserRepository,
    private profilesRepository: IProfilesRepository
  ) { }

  async execute({
    id,
    file,
  }: ContentAvatarRequest): Promise<ContentAvatarResponse> {
    const uploadService = new CloudinaryUploadService();
    const deleteService = new CloudinaryDeleteService();

    if (!file) {
      return left(new ParametersErrors('File is required'));
    }

    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return left(new ParametersErrors("User not found"));
    }

    // verify if file is a base64
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const fileInfo = getMimeTypeAndExtensionFromBase64(base64, "banner");

    if (fileInfo.error) {
      return left(new ParametersErrors(fileInfo.error));
    }

    // Check limits based on user type
    const limits = user.isPremium ? uploadConfig.banner.limits.premium : uploadConfig.banner.limits.default;
    const fileLimit = limits;

    // Check if the file type is allowed
    const mimeTypesConfig = user.isPremium ? uploadConfig.banner.mimeTypes.premium : uploadConfig.banner.mimeTypes.default;
    const allowedExtensions = Object.keys(mimeTypesConfig);

    if (!allowedExtensions.includes(file.mimetype)) {
      return left(
        new ParametersErrors(
          `Invalid file type. Allowed types: ${allowedExtensions.join(", ")}.`
        )
      );
    }

     // Check if the file size exceeds the limit
     if (file.size > fileLimit) {
      return left(
        new ParametersErrors(
          `File size exceeds the limit for ${file.mimetype}.`
        )
      );
    }

    const profile = await this.profilesRepository.findOne(id);
    if (!profile) {
      return left(new ParametersErrors("Profile not found"));
    }

    // For now, delete user banner if already have a custom.
    if (profile.cover) {
      const public_id = profile.cover.split('/').pop()?.split('.')[0]; // Extract public_id from URL
      if (public_id) {
        await deleteService.deleteBanner(public_id);
      }
    }

    try {
      const upload = await uploadService.uploadBanner(file);

      profile.setCoverURL = upload.url;
      await this.profilesRepository.save(profile);

      return right({
        file: upload.url,
      });
    } catch (error) {
      return left(new ParametersErrors("Error uploading image."));
    }
  }
}