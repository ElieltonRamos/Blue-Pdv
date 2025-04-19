export type StatusHTTP = 'OK' | 'CREATED' | 'NO_CONTENT' | 'SERVER_ERROR' | 'UNPROCESSABLE_ENTITY'
| 'BAD_REQUEST' | 'UNAUTHORIZED' | 'NOT_FOUND';

export default function mapHttpStatus(status: StatusHTTP): number {
  switch (status) {
    case 'OK':
      return 200;
    case 'CREATED':
      return 201;
    case 'NO_CONTENT':
      return 204;
    case 'BAD_REQUEST':
      return 400;
    case 'UNAUTHORIZED':
      return 401;
    case 'UNPROCESSABLE_ENTITY':
      return 403;
    case 'NOT_FOUND':
      return 404;
    case 'SERVER_ERROR':
      return 500;
    default:
      return 500;
  }
};