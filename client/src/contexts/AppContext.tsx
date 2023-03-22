import { createContext, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { storage } from '~/utils/storage';
import { useState } from 'react';
import { BASE_URL, storageKey } from '~/utils/constants';
import { IUser } from '~/types/user';
import { io, Socket } from 'socket.io-client';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  socket: Socket | null;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(storage.get(storageKey.accessToken)),
  setIsAuthenticated: () => null,
  currentUser: null,
  setCurrentUser: () => null,
  socket: null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated,
  );

  const [currentUser, setCurrentUser] = useState<IUser | null>(initialAppContext.currentUser);

  const socket = useRef<Socket | null>(initialAppContext.socket);

  useEffect(() => {
    socket.current = io(BASE_URL);

    return () => {
      socket.current?.close();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        socket: socket.current,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
