export type BackendResponse<T> = {
  status: number;
  message: string;
  data: T;
  listener?: {
    target_url: string;
    listener_url: string;
  };
};
