export type Auth = {
  token: string;
  name: string;
  id: string;
  authenticated: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type AuthState = {
  auth: Auth;
};
