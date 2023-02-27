import { FC, useLayoutEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

const ScrollTop: FC = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return <>{children}</>;
};

export default withRouter(ScrollTop);
