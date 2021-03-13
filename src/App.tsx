import { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';

import * as Session from '@/services/session';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import { StylesProvider } from './StylesProvider';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

function PublicRoute(props: RouteProps) {
  const { path, exact, children } = props;

  return (
    <Route path={path} exact={exact}>
      {Session.getUser() ? (
        <Redirect to="/" />
      ) : (
        <Suspense fallback={null}>{children}</Suspense>
      )}
    </Route>
  );
}

function PrivateRoute(props: RouteProps) {
  const { path, exact, children } = props;

  return (
    <Route path={path} exact={exact}>
      {Session.getUser() ? (
        <ErrorBoundary>
          <Suspense fallback={null}>{children}</Suspense>
        </ErrorBoundary>
      ) : (
        <Redirect to={`/login?returnUrl=${document.location.pathname}`} />
      )}
    </Route>
  );
}

function NotFound() {
  return <>Такой страницы не существует</>;
}

export function App() {
  return (
    <StylesProvider>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" exact>
            <LoginPage />
          </PublicRoute>

          <PrivateRoute path="/dashboard" exact>
            <DashboardPage />
          </PrivateRoute>

          <Redirect from="/" to="/dashboard" exact />

          <PrivateRoute path="/">
            <NotFound />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
}
