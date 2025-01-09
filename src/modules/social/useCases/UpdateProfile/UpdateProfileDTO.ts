export interface UpdateProfileRequest {
  user: { id: string };
  name:  string;
  bio: string;
  link: string;
  slug: string;
  action: string;
};