export interface AuthModel {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    organization: string;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
    access_expires: string;
    refresh_expires: string;
  };
}
