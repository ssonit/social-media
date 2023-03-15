import useRouteElements from './hooks/useRouteElements';
import ModalManage from './components/Modal/ModalManage';
import LoadingScreen from './components/Common/LoadingScreen';
import authApi from './services/auth';
import { Suspense, useContext, useEffect } from 'react';
import { ModalContextProvider } from './contexts/ModalContext';
import { AppContext } from './contexts/AppContext';
import { PostContextProvider } from './contexts/PostContext';
import { ConversationContextProvider } from './contexts/ConversationContext';

import './App.css';
import './css/style.css';

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
          <ConversationContextProvider>
            {routeElements}
            <ModalManage></ModalManage>
          </ConversationContextProvider>
        </PostContextProvider>
      </ModalContextProvider>
    </Suspense>
  );
}

export default App;
