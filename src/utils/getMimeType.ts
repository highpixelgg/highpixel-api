import { uploadConfig } from '@config/upload-config';

export function getMimeTypeAndExtensionFromBase64(
  b64: string,
  contentType: keyof typeof uploadConfig
) {
  const matches = b64.match(/^data:([A-Za-z]+\/[A-Za-z0-9\-.+]+);base64,/);

  if (matches && matches.length === 2) {
    const mimeType = matches[1];
    const mimeTypesConfig = uploadConfig[contentType].mimeTypes;
    const mimeTypes = mimeTypesConfig['default'] || mimeTypesConfig;

    let fileExtension = null;
    if (mimeTypes[mimeType]) {
      fileExtension = mimeTypes[mimeType];
    }

    if (!uploadConfig[contentType]) {
      return {
        mimeType: null,
        extension: null,
        error: `Invalid content type: ${contentType}`,
      };
    }
    
    if (fileExtension) {
      return {
        mimeType: mimeType,
        extension: fileExtension,
      };
    } else {
      return {
        mimeType: null,
        extension: null,
        error: `Invalid file type for ${contentType}. Allowed types: ${Object.keys(mimeTypes).join(", ")}`,
      };
    }
  }

  return {
    mimeType: null,
    extension: null,
    error: "Invalid base64 format or MIME type.",
  };
}  