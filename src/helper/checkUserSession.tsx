import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from "next";

const jwt_secret = process.env.JWT_SECRET;
const secureCookieName = '__Secure-next-auth.session-token';
const insecureCookieName = 'next-auth.session-token';

export  async function checkUserSession(request: NextApiRequest): Promise<boolean> {

  const encryptedToken = request.cookies[secureCookieName] || request.cookies[insecureCookieName];
  const infoUser = await jwt.getToken({ req: request, secret: jwt_secret });

  if (infoUser && encryptedToken) {
    return true;
  }

  return false;

}

export  async function checkActiveSubscription(request: NextApiRequest): Promise<boolean> {
  const encryptedToken = request.cookies[secureCookieName] || request.cookies[insecureCookieName];
  const infoUser = await jwt.getToken({ req: request, secret: jwt_secret });

  console.dir(infoUser)

  return false;
}
