import React, { ReactElement, useEffect } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import '../styles/App.css';
import { includes, isEmpty } from 'lodash';
import { ThemeProvider } from '@material-ui/core';
import { UserContextValue, useUser } from '../stores/UserStore';
import { TenantContextValue, useTenant } from '../stores/TenantStore';
import { routes, RouteDescriptor } from '../pages/index';
import Layout from '../layout/Layout';
import Loading from '../components/common/Loading';
import ScrollTop from '../components/ScrollTop';

const App = () => {
  const history = useHistory();
  const location = useLocation();

  const {
    currentUser,
    isFetchingCurrentUser,
    fetchCurrentUser,
  } = useUser() as UserContextValue;

  const {
    currentTenant,
    currentTheme,
    isFetchingTenant,
    fetchCurrentTenant,
  } = useTenant() as TenantContextValue;

  useEffect(() => {
    fetchCurrentTenant()
      .then(() => {
        fetchCurrentUser();
      });
  }, []);

  if (isFetchingTenant || isFetchingCurrentUser) {
    return <Loading message="Loading Application" />;
  }

  if (!currentTenant || !currentTheme) {
    // TODO render error message
    return null;
  }

  const isAuthenticated = currentUser !== undefined;

  if (isAuthenticated && location.pathname === '/login') {
    history.push('/');
    return null;
  }

  const validNotAuthenticatedPages = ['/login', '/loginSso', '/error', '/help'];
  if (!isAuthenticated && !includes(validNotAuthenticatedPages, location.pathname)) {
    history.push('/login');
    return null;
  }

  const renderRoute = (route: RouteDescriptor): ReactElement => {
    const { component: ContainerComponent } = route;
    return (
      <Route
        exact={route.exact}
        path={route.path}
        key={route.path}
        component={() => (
          <Layout tenant={currentTenant} user={currentUser}>
            <ScrollTop>
              <ContainerComponent />
            </ScrollTop>
          </Layout>
        )}
      />
    );
  };

  const renderRoutes = (): ReactElement[] | null => {
    if (isEmpty(routes)) {
      return null;
    }

    const renderedRoutes: ReactElement[] = routes.map((route) => renderRoute(route));
    return renderedRoutes;
  };

  return (
    <>
      <Helmet>
        <title>{currentTenant.name}</title>
        <meta name="description" content={currentTenant.description} />
        <link rel="icon" href={currentTenant.uiPreferences.favIconUrl} />
      </Helmet>
      <ThemeProvider theme={currentTheme}>
        <Switch>
          {renderRoutes()}
        </Switch>
      </ThemeProvider>
    </>
  );
};

export default App;
