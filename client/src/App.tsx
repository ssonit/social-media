import useRouteElements from './hooks/useRouteElements';
import ModalManage from './components/Modal/ModalManage';
import LoadingScreen from './components/Common/LoadingScreen';
import authApi from './services/auth';
import { Suspense, useContext, useEffect } from 'react';
import { ModalContextProvider } from './contexts/ModalContext';
import { AppContext } from './contexts/AppContext';
import './App.css';
import './css/style.css';
import { PostContextProvider } from './contexts/PostContext';

function App() {
  const routeElements = useRouteElements();
  const { isAuthenticated, setCurrentUser } = useContext(AppContext);

  useEffect(() => {
    const abortController = new AbortController();

    async function reloadApp() {
      const res = await authApi.reload({
        signal: abortController.signal,
      });
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
        <PostContextProvider>
          {routeElements}
          <ModalManage></ModalManage>
        </PostContextProvider>
      </ModalContextProvider>
    </Suspense>
  );
}

export default App;
