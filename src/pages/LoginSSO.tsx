import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { UserContextValue, useUser } from '../stores/UserStore';

export const LoginSSO = () => {
  const history = useHistory();

  const {
    isFetchingCurrentSSOUser,
    setCurrentSSOUser,
    currentUser,
  } = useUser() as UserContextValue;

  useEffect(() => {
    setCurrentSSOUser();
  }, []);

  if (isFetchingCurrentSSOUser) {
    return (
      <Loading message="Signing In" />
    );
  }

  if (!currentUser) {
    history.push('/error');
    return null;
  }

  history.push('/');
  return null;
};
