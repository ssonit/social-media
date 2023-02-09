import useRouteElements from './hooks/useRouteElements';
import ModalManage from './components/Modal/ModalManage';
import LoadingScreen from './components/Common/LoadingScreen';
import authApi from './services/auth';
import { Suspense, useContext, useEffect } from 'react';
import { storageKey } from './utils/constants';
import { ModalContextProvider } from './contexts/ModalContext';
import { cookie, storage } from './utils/storage';
import { AppContext } from './contexts/AppContext';
import './App.css';

function App() {
  const routeElements = useRouteElements();
  const { isAuthenticated, setCurrentUser } = useContext(AppContext);
  useEffect(() => {
    const abortController = new AbortController();

    async function reloadApp() {
      const res = await authApi.reload({
        signal: abortController.signal,
      });
      cookie.set(storageKey.accessToken, res.data.data.accessToken);
      storage.set(storageKey.accessToken, res.data.data.accessToken);
      setCurrentUser(res.data.data.user);
    }
    if (isAuthenticated) {
      reloadApp();
    }

    return () => {
      abortController.abort();
    };
  }, [isAuthenticated, setCurrentUser]);

  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center h-screen bg-bgColor'>
          <LoadingScreen></LoadingScreen>
        </div>
      }
    >
      <ModalContextProvider>
        {routeElements}
        <ModalManage></ModalManage>
      </ModalContextProvider>
    </Suspense>
  );
}

export default App;
