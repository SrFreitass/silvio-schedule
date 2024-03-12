export interface http<T> {
  statusCode: number;
  message: string;
  data: T;
}
