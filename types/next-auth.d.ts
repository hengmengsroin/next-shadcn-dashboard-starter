import NextAuth, { DefaultSession } from 'next-auth';

interface IAuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  token: string;
  refresh_token: string;
  access_expires: string;
  refresh_expires: string;
}

declare module 'next-auth' {
  // type UserSession = DefaultSession['user'];
  // interface Session {
  //   user: UserSession;
  // }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      token: string;
      image?: string;
      refresh_token: string;
      access_expires: string;
      refresh_expires: string;
      error?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
    token: string;
    refresh_token: string;
    access_expires: string;
    refresh_expires: string;
    error?: string;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
