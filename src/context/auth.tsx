import { createContext, ReactNode, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as AuthSession from 'expo-auth-session';
import { api } from "../services/api";

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

const USER_STORAGE = '@stage3-reactnative:user';
const TOKEN_STORAGE = '@stage3-reactnative:token';

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
    error?: string;
  };
  type?: string;
};

export function AuthProvider ({ children }: TAuthProviderProps) {

  const [user, setUser] = useState<TUser | null>(null);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(true);

  async function signIn () {
    try {
      setIsLoadingSignIn(true);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as TAuthorizationResponse;

      if (authSessionResponse.type === 'success' || authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code });

        const { user, token } = authResponse.data as TAuthResponse;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      };
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingSignIn(false);
    };
  };

  async function signOut () {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  };

  useEffect(() => {
    async function loadStorageData () {
      const userData = await AsyncStorage.getItem(USER_STORAGE);
      const tokenData = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userData && tokenData) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`;
        setUser(JSON.parse(userData));
      };

      setIsLoadingSignIn(false);
    };

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoadingSignIn, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  );
};