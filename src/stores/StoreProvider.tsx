import { FC } from 'react';
import UserProvider from './UserStore';
import PathwayProvider from './PathwayStore';
import UserActivityProvider from './UserActivityStore';
import TenantProvider from './TenantStore';

type StoreProviderProps = {};

const StoreProvider: FC<StoreProviderProps> = ({ children }) => (
  <TenantProvider>
    <UserProvider>
      <PathwayProvider>
        <UserActivityProvider>
          {children}
        </UserActivityProvider>
      </PathwayProvider>
    </UserProvider>
  </TenantProvider>
);

export default StoreProvider;
