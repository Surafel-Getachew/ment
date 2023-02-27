import { createContext, useContext, useState } from 'react';
import Amplify from 'aws-amplify';

import { aspireApi } from '../api';
import { getTheme } from '../styles';
import { AuthType, ITenant } from '../types/ITenant';
import IUser from '../types/IUser';

export type TenantContextValue = {
  currentTenant: ITenant | undefined;
  currentTheme: any;
  isFetchingTenant: boolean;
  fetchCurrentTenant: () => Promise<void>;
};

const TenantContext = createContext<undefined | TenantContextValue>(undefined);

export const useTenant = () => useContext(TenantContext);

const TenantProvider = ({ children }: any) => {
  const [isFetchingTenant, setIsFetchingTenant] = useState(true);
  const [currentTheme, setCurrentTheme] = useState();
  const [currentTenant, setCurrentTenant] = useState<ITenant>();

  const initCognito = (tenant: ITenant) => {
    const ssoConfig = tenant.authPreferences;
    const Auth = {
      oauth: {
        domain: ssoConfig.domain,
        redirectSignIn: ssoConfig.redirectSignIn,
        redirectSignOut: ssoConfig.redirectSignOut,
        responseType: 'token',
      },
      region: ssoConfig.awsRegion,
      userPoolId: ssoConfig.userPoolId,
      userPoolWebClientId: ssoConfig.userPoolAppId,
    };

    Amplify.configure({ Auth });
  };

  const fetchCurrentTenant = async () => {
    try {
      if (currentTenant !== undefined) {
        return;
      }

      setIsFetchingTenant(true);
      const res = await aspireApi.get('/tenants/current');
      const tenant = res.data as ITenant;
      setCurrentTenant(tenant);
      setCurrentTheme(getTheme(tenant));

      if (tenant.authPreferences.authType === AuthType.SSO) {
        initCognito(tenant);
      }
      setIsFetchingTenant(false);
    } catch (error) {
      setIsFetchingTenant(false);
    }
  };

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        currentTheme,
        isFetchingTenant,
        fetchCurrentTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export default TenantProvider;
