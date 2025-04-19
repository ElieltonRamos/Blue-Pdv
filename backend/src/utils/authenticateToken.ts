import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET || 'secret';

type Payload = {
  username: string,
  function: string,
};

export const generateToken = (payload: Payload): string => jwt.sign(payload, secretKey);

export const verifyToken = (token: string): Payload | string => {
  try {
    const user = jwt.verify(token, secretKey) as Payload;
    return user;
  } catch (error) {
    return 'Token Invalido';
  }
};