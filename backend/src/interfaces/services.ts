import { StatusHTTP } from '../utils/mapStatusHttp';
import User from './user';

export type ServiceResponse<Data> = {
  status: StatusHTTP;
  data: Data | { message: string };
};

export type LoginResponse = { token: User } | { message: string };

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

