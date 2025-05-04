export default interface User {
  id?: number;
  username: string;
  password: string;
  function?: string;
}

export interface Token {
  token: string;
}
