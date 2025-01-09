import { lowracingConfig } from "config/lowracing.config";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { cloudinaryDelete, cloudinaryUpload } from "infra/http/services/cloudinary/CloudinaryStorage";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";
import { isLimitReached } from "utils/isLimiteReached";

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
    if (!file) {
      return left(new ParametersErrors('File is required'));
    }

    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return left(new ParametersErrors("User not found"));
    }

    const limitConfig = user?.isPremium
      ? lowracingConfig.limitsPremium
      : lowracingConfig.limitsDefault;
    const fileLimitError = isLimitReached(limitConfig, file);

    if (fileLimitError) {
      return left(new ParametersErrors('Upload limit reached.'));
    }

    const profile = await this.profilesRepository.findOne(id);

    // For now, delete user's avatar if already have a custom.
    if (profile.cover) {
      const public_id = profile.cover.split('/').pop()?.split('.')[0];
      if (public_id) {
        await cloudinaryDelete(public_id);
      }
    }

    try {
      const upload = await cloudinaryUpload(file, 'banners');

      profile.setCoverURL = upload.url;
      await this.profilesRepository.save(profile);

      return right({
        file: upload.url,
      });
    } catch (error) {
      return left(error);
    }
  }
}