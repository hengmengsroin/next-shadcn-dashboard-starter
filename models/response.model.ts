export interface IPagination {
  totalItem?: number;
  total_pages?: number;
  has_next_page?: boolean;
  next_page?: string;
  has_prev_page?: boolean;
  prev_page?: null;
  count?: string;
  page?: string;
}

export interface IResponse<T> {
  data: T[];
  pagination: IPagination;
}
