import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { ITenant } from '../types/ITenant';
import IUser from '../types/IUser';
import Footer from './Footer';
import Header from './Header';
import NewHeader from './NewHeader';

type LayoutProps = {
  tenant: ITenant,
  user?: IUser
};

const Layout: FC<LayoutProps> = ({ tenant, user, children }) => (
  <Box style={{ marginTop: '76px', backgroundColor: '#F9F9F9' }}>
    <Box minHeight="30vh">
      <NewHeader tenant={tenant} user={user} />
      {children}
    </Box>
    <Footer />
  </Box>
);

export default Layout;
