import { useState, useEffect } from 'react';
import {
  Box, Button, Grid, makeStyles, TextField,
} from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { UserContextValue, useUser } from '../stores/UserStore';
import { TenantContextValue, useTenant } from '../stores/TenantStore';
import Loading from '../components/common/Loading';
import { AuthType } from '../types/ITenant';

const Login = () => {
  const { signIn } = useUser() as UserContextValue;

  const {
    currentTenant,
    isFetchingTenant,
    fetchCurrentTenant,
  } = useTenant() as TenantContextValue;

  useEffect(() => {
    fetchCurrentTenant();
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isFetchingTenant) {
    return <Loading />;
  }

  if (!currentTenant) {
    // Go to 404
    return null;
  }

  const onSubmit = () => {
    signIn(email, password);
  };

  const renderLocalLogin = () => (
    <Box py={3} px={{ xs: 2, sm: 3, md: 7 }}>
      <form onSubmit={onSubmit} autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  label="Username"
                  name="aspire-email"
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  color="primary"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );

  if (currentTenant.authPreferences.authType === AuthType.PASSWORD) {
    return renderLocalLogin();
  }

  if (currentTenant.authPreferences.providerName) {
    Auth.federatedSignIn({ customProvider: currentTenant.authPreferences.providerName });
  }

  // TODO go to error page
  return null;
};

export default Login;
