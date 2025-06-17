export interface ApiRes<T> {
  message: string;
  data: T;
}

export interface ApiRestPagination<T> extends ApiRes<T> {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
