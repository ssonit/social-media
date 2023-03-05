import { lazy, useContext } from 'react';
import { useRoutes, Outlet, Navigate } from 'react-router-dom';
import { AppContext } from '~/contexts/AppContext';
import { pathRoute } from '~/utils/constants';

const Home = lazy(() => import('~/pages/Home'));
const Login = lazy(() => import('~/pages/Login'));
const Register = lazy(() => import('~/pages/Register'));
const Profile = lazy(() => import('~/pages/Profile'));
const EditProfile = lazy(() => import('~/pages/EditProfile'));
const PageNotFound = lazy(() => import('~/pages/PageNotFound'));
const DetailPost = lazy(() => import('~/pages/DetailPost'));
const Explore = lazy(() => import('~/pages/Explore'));
const Messages = lazy(() => import('~/pages/Messages'));

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={pathRoute.login} />;
};

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={pathRoute.home} />;
};

export default function useRouteElements() {
  const routesElement = useRoutes([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: pathRoute.home,
          element: <Home />,
        },
        {
          path: pathRoute.profile,
          element: <Profile />,
        },
        {
          path: pathRoute.editProfile,
          element: <EditProfile />,
        },
        {
          path: pathRoute.detail_post,
          element: <DetailPost />,
        },
        {
          path: pathRoute.explore,
          element: <Explore />,
        },
        {
          path: pathRoute.messages,
          element: <Messages />,
        },
      ],
    },
    {
      element: <RejectedRoute />,
      children: [
        {
          path: pathRoute.login,
          element: <Login />,
        },
        {
          path: pathRoute.register,
          element: <Register />,
        },
      ],
    },
    {
      element: <PageNotFound />,
      path: '*',
    },
  ]);

  return routesElement;
}
