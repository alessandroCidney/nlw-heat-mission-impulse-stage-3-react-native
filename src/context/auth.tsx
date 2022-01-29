import { createContext, ReactNode, useState } from "react";

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

export const AuthContext = createContext({} as TAuthContextData);

type TAuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider ({ children }: TAuthProviderProps) {

  const [user, setUser] = useState<TUser | null>(null);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);

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