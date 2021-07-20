import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'next-auth/jwt';

export async function getUserSession(request: NextApiRequest, response: NextApiResponse) {

  const jwt_secret = process.env.JWT_SECRET;
  const secureCookieName = '__Secure-next-auth.session-token';
  const insecureCookieName = 'next-auth.session-token';
  const encryptedToken = request.cookies[secureCookieName] || request.cookies[insecureCookieName]
  const infoUser = await jwt.getToken({ req: request, secret: jwt_secret })

  if (!encryptedToken || !infoUser) {
    return null;
  }

  return infoUser;
}
