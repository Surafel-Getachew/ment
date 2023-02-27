import { createContext, useContext, useState } from 'react';
import { Auth } from 'aws-amplify';

import _ from 'lodash';
import IUser from '../types/IUser';

import { aspireApi } from '../api';

export type UserContextValue = {
  currentUser: IUser | undefined;
  isFetchingCurrentUser: boolean;
  isFetchingCurrentSSOUser: boolean;
  fetchCurrentUser: () => void;
  signIn: (email: string, password: string) => void;
  setCurrentSSOUser: () => void;
};

const UserContext = createContext<undefined | UserContextValue>(undefined);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: any) => {
  const [isFetchingCurrentUser, setIsFetchingUser] = useState(true);
  const [isFetchingCurrentSSOUser, setIsFetchingCurrentSSOUser] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const fetchCurrentUser = async () => {
    try {
      if (currentUser !== undefined) {
        return;
      }

      setIsFetchingUser(true);

      const res = await aspireApi.get('/users/me');
      setCurrentUser(res.data);
      setIsFetchingUser(false);
    } catch (error) {
      setIsFetchingUser(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsFetchingUser(true);

      const res = await aspireApi.post('/signIn', { username: email, password });
      setCurrentUser(res.data);
      setIsFetchingUser(false);
    } catch (error) {
      setIsFetchingUser(false);
    }
  };

  const setCurrentSSOUser = async () => {
    if (currentUser !== undefined) {
      return;
    }

    try {
      setIsFetchingCurrentSSOUser(true);

      const cognitoUserInfo = await Auth.currentUserInfo();
      const cognitoSession = await Auth.currentSession();
      const accessToken = cognitoSession.getAccessToken().getJwtToken();
      const payload = {
        email: _.get(cognitoUserInfo, 'attributes.email'),
        firstName: _.get(cognitoUserInfo, 'attributes.given_name'),
        lastName: _.get(cognitoUserInfo, 'attributes.family_name'),
        accessToken,
      };

      const res = await aspireApi.post('/signInSso', payload);
      setCurrentUser(res.data);
      setIsFetchingCurrentSSOUser(false);
    } catch (error) {
      setIsFetchingCurrentSSOUser(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isFetchingCurrentUser,
        isFetchingCurrentSSOUser,
        fetchCurrentUser,
        signIn,
        setCurrentSSOUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
