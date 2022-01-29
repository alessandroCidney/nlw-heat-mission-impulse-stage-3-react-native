import { createContext, ReactNode, useState } from "react";

import * as AuthSession from 'expo-auth-session';

type TUser = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
};

type TAuthContextData = {
  user: TUser | null;
  isLoadingSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const CLIENT_ID = 'fb97d2b15a690ee47f75';
const SCOPE = 'read:user';

export const AuthContext = createContext({} as TAuthContextData);

type TAuthProviderProps = {
  children: ReactNode;
};

type TAuthResponse = {
  token: string;
  user: TUser;
};

type TAuthorizationResponse = {
  params: {
    code?: string;
  }
};

export function AuthProvider ({ children }: TAuthProviderProps) {

  const [user, setUser] = useState<TUser | null>(null);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);

  const authURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

  async function signIn () {

  };

  async function signOut () {

  };

  return (
    <AuthContext.Provider value={{ user, isLoadingSignIn, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  );
};