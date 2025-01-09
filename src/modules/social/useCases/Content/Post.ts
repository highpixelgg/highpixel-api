import { lowracingConfig } from "config/lowracing.config";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { cloudinaryUpload } from "infra/http/services/cloudinary/CloudinaryStorage";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";
import { IPostsRepository } from "modules/social/repositories/IPostsRepository";
import { isLimitReached } from "utils/isLimiteReached";

type ContentAssetPostRequest = {
  file: Express.Multer.File;
  id: string;
};

type FileResponse = {
  file: string;
};

type ContentAssetPostResponse = Either<ParametersErrors, FileResponse>;

export class ContentPost {
  constructor(
    private usersRepository: IUserRepository,
    private postsRepository: IPostsRepository
  ) { }

  async execute({
    id,
    file,
  }: ContentAssetPostRequest): Promise<ContentAssetPostResponse> {
    if (!file) {
      return left(new ParametersErrors("File is required"));
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

    try {
      const upload = await cloudinaryUpload(file, 'posts');

      // Update the post asset with the new Cloudinary URL
      return right({
        file: upload.url,
      });
    } catch (error) {
      return left(new ParametersErrors("Error uploading file to Cloudinary"));
    }
  }
}
