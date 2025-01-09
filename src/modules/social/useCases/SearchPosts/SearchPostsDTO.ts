interface ISearchPostsRequest {
  user: { id: string };
  query?: string;
  page?: number;
  perPage?: number;
};