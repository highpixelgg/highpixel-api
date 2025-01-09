export const lowracingConfig = {
  product: 'Low Racing API',
  baseURL: process.env.BASE_URL,
  limitsDefault: [
    { fileType: 'image/jpeg', maxSizeInBytes: 5242880 },   // 5MB for JPEG files
    { fileType: 'image/png', maxSizeInBytes: 5242880 },    // 5MB for PNG files
    { fileType: 'image/gif', maxSizeInBytes: 5242880 },    // 5MB for GIF files
    { fileType: 'audio/ogg', maxSizeInBytes: 10485760 },    // 10MB for AUDIO OGG files
    { fileType: 'audio/mp3', maxSizeInBytes: 10485760 },    // 10MB for AUDIO MP3 files
    { fileType: 'video/mp4', maxSizeInBytes: 26214400 },    // 25MB for MP4 video files
    { fileType: 'video/avi', maxSizeInBytes: 26214400 },    // 25MB for AVI video files
    { fileType: 'video/mkv', maxSizeInBytes: 26214400 },    // 25MB for MKV video files
  ],
  limitsPremium: [
    { fileType: 'image/jpeg', maxSizeInBytes: 10485760 },   // 10MB for JPEG files
    { fileType: 'image/png', maxSizeInBytes: 10485760 },    // 10MB for PNG files
    { fileType: 'image/gif', maxSizeInBytes: 10485760 },    // 10MB for GIF files
    { fileType: 'audio/ogg', maxSizeInBytes: 15728640 },    // 15MB for AUDIO OGG files
    { fileType: 'audio/mp3', maxSizeInBytes: 15728640 },    // 15MB for AUDIO MP3 files
    { fileType: 'video/mp4', maxSizeInBytes: 52428800 },    // 50MB for MP4 video files
    { fileType: 'video/avi', maxSizeInBytes: 52428800 },    // 50MB for AVI video files
    { fileType: 'video/mkv', maxSizeInBytes: 52428800 },    // 50MB for MKV video files
  ],
}