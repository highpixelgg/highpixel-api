export const uploadConfig = {
  avatar: {
    mimeTypes: {
      default: {
        'image/jpeg': 'jpg',
        'image/png': 'png',
      },
      premium: {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
      },
    },
    limits: {
      default: 5242880, // 5MB
      premium: 10485760, // 10MB
    },
  },
  banner: {
    mimeTypes: {
      default: {
        'image/jpeg': 'jpg',
        'image/png': 'png',
      },
      premium: {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
      },
    },
    limits: {
      default: 5242880, // 5MB
      premium: 10485760, // 10MB
    },
  },
  post: {
    mimeTypes: {
      default: {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'video/mp4': 'mp4',
        'video/avi': 'avi',
        'video/mkv': 'mkv',
      },
      premium: {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'audio/ogg': 'ogg',
        'audio/mp3': 'mp3',
        'audio/mpeg': 'mpeg',
        'video/mp4': 'mp4',
        'video/avi': 'avi',
        'video/mkv': 'mkv',
      },
    },
    limits: {
      default: {
        'image/jpeg': 5242880, // 5MB
        'image/png': 5242880, // 5MB
        'video/mp4': 26214400, // 25MB
        'video/avi': 26214400, // 25MB
        'video/mkv': 26214400, // 25MB
      },
      premium: {
        'image/jpeg': 10485760, // 10MB
        'image/png': 10485760, // 10MB
        'image/gif': 10485760, // 10MB
        'audio/ogg': 15728640, // 15MB
        'audio/mp3': 15728640, // 15MB
        'audio/mpeg': 15728640, // 15MB
        'video/mp4': 52428800, // 50MB
        'video/avi': 52428800, // 50MB
        'video/mkv': 52428800, // 50MB
      },
    },
  },
};