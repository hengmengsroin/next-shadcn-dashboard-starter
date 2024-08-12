import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { generalApi } from './services/generalApi';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const result = await generalApi.loginWithEmail(
          email as string,
          password as string
        );
        if (result) {
          const user = result.user;
          const token = result.tokens;
          const res = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: token.access_token,
            refresh_token: token.refresh_token,
            access_expires: token.access_expires,
            refresh_expires: token.refresh_expires
          };
          return res;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
