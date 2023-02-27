/* eslint-disable */
import {
  Box,
  Typography,
  Hidden,
  Link,
  MenuItem,
  Menu as MenuComponent,
} from '@material-ui/core';
import { FC, useState, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { HelpOutline, Menu } from '@material-ui/icons';
import IUser from '../types/IUser';
import { ITenant } from '../types/ITenant';

type HeaderProps = {
  tenant: ITenant,
  user?: IUser;
};

const Header: FC<HeaderProps> = ({ tenant, user }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderHelpLink = () => (
    <Link href='/help'>
      <Box display='flex'>
        <HelpOutline />
        <Box px={0.5}>
          <Typography>Help</Typography>
        </Box>        
      </Box>
    </Link>
  );

  return (
    <Box
      bgcolor='background.paper'
      width='100%'
      height='76px'
      position='fixed'
      top='0'
      left='0'
      zIndex='10'
    >
      <Box
        height='100%'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box
          display='flex'
          justifyContent='space-between'
          px={{ xs: 1, md: 4 }}
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/')}
        >
          <img
            alt='ASU logo'
            src={tenant.uiPreferences.iconUrl}
            style={{ height: `${tenant.uiPreferences.iconHeight}px` }}
          />
        </Box>
        <Hidden smDown>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            {renderHelpLink()}
            <Box display='flex' p={3}>
              {user && (
                <Typography color="primary">
                  Hi&nbsp;
                  {user.firstName}!
                </Typography>
              )}
            </Box>
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box mr={2} onClick={handleClick}>
            <Menu color='primary' />
          </Box>
        </Hidden>
        <MenuComponent
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>{renderHelpLink()}</MenuItem>
        </MenuComponent>
      </Box>
    </Box>
  );
};

export default Header;
