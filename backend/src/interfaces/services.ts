import { StatusHTTP } from '../utils/mapStatusHttp';

export type ServiceResponse<Data> = {
  status: StatusHTTP;
  data: Data | { message: string };
};

export type LoginResponse = { token: string } | { message: string };
