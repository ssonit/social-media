import { Suspense, useContext, useEffect } from 'react';
import Spinner from './components/Common/Spinner';
import { AppContext } from './contexts/AppContext';
import { ModalContextProvider } from './contexts/ModalContext';
import useRouteElements from './hooks/useRouteElements';
import authApi from './services/auth';
import { storageKey } from './utils/constants';
import { cookie, storage } from './utils/storage';

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
        <div className='flex items-center justify-center h-screen bg-black'>
          <Spinner></Spinner>
        </div>
      }
    >
      <ModalContextProvider>{routeElements}</ModalContextProvider>
    </Suspense>
  );
}

export default App;
