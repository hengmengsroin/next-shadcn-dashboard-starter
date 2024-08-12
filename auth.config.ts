import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { generalApi } from './services/generalApi';
async function refreshAccessToken(refreshToken: string) {
  console.log('called refresh Access token');
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await generalApi.refreshToken(refreshToken);
    return {
      accessToken: tokenResponse.access_token,
      accessTokenExpiry: tokenResponse.access_expires,
      refreshToken: tokenResponse.refresh_token,
      refreshTokenExpiry: tokenResponse.refresh_expires,
      error: null
    };
  } catch (error) {
    console.log('Error refreshing access token', error);
    return {
      error: 'RefreshAccessTokenError'
    };
  }
}

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
        let result = await generalApi.loginWithEmail(
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
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('called jwt ');
      if (user) {
        // user is only given the first time but when you write tokens they stick around
        token.id = user.id;
        token.token = user.token ?? '';
        token.role = user.role;
        token.accessTokenExpiry = user.access_expires;
        token.refreshToken = user.refresh_token;
        token.refreshTokenExpiry = user.refresh_expires;
        token.error = user.error;
      }

      const shouldRefreshTime =
        new Date(token.accessTokenExpiry as string).getTime() - Date.now() <
        60 * 1000;

      if (shouldRefreshTime) {
        // refresh the access token
        console.log('Refreshing access token');
        const newToken = await refreshAccessToken(token.refreshToken as string);
        token.token = newToken.accessToken;
        token.accessTokenExpiry = newToken.accessTokenExpiry;
        token.refreshToken = newToken.refreshToken;
        token.refreshTokenExpiry = newToken.refreshTokenExpiry;
        token.error = newToken.error;
        return token;
      }
      return token;
    },
    session({ session, token }) {
      console.log('called session');
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
        session.user.refresh_token = token.refreshToken as string;
        session.user.access_expires = token.accessTokenExpiry as string;
        session.user.refresh_expires = token.refreshTokenExpiry as string;
        session.user.error = token.error as string;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
