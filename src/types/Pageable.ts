export interface Pagination {
  page?: number;
  size?: number;
}

export default interface Pageable<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
} 