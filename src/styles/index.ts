import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ITenant } from '../types/ITenant';

const defaultTheme = {
  // palette: {
  //   primary: {
  //     main: '#402383',
  //   },
  //   secondary: {
  //     main: '#FCAE1E'
  //   },
  // },
  typography: {
    fontFamily: [
      'DM Sans',
      // '-apple-system',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 15,
  },
};

// eslint-disable-next-line import/no-mutable-exports
let theme = createTheme(defaultTheme);
theme = responsiveFontSizes(theme);

export const getTheme = (tenant: ITenant): any => {
  const tenantTheme = {
    ...defaultTheme,
    palette: {
      primary: {
        main: tenant.uiPreferences.primaryColor,
      },
      secondary: {
        main: tenant.uiPreferences.secondaryColor,
      },
    },
  };
  return responsiveFontSizes(createTheme(tenantTheme));
};

export { theme };
