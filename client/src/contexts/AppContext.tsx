import { createContext, Dispatch, SetStateAction } from 'react';
import { storage } from '~/utils/storage';
import { useState } from 'react';
import { storageKey } from '~/utils/constants';
import { IUser } from '~/types/user';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(storage.get(storageKey.accessToken)),
  setIsAuthenticated: () => null,
  currentUser: null,
  setCurrentUser: () => null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated,
  );

  const [currentUser, setCurrentUser] = useState<IUser | null>(initialAppContext.currentUser);

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser }}
    >
      {children}
    </AppContext.Provider>
  );
};
