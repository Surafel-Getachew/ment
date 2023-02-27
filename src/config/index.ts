// Import all environment config files here
import localhost from './localhost';
import demo from './demo';
import dev from './dev';
import staging from './staging';

// Map to environment name
const envToConfig: any = {
  localhost,
  demo,
  dev,
  staging,
};

const env = process.env.REACT_APP_BUILD_ENV; // eslint-disable-line no-undef
const envName = env || 'localhost';
const envConfig = envToConfig[envName];

const config = {
  ...envConfig,
  isLocal: envName === 'localhost',
  isDemo: envName === 'demo',
  isDev: envName === 'dev',
  isStaging: envName === 'staging',
  isProd: envName === 'prod',
};

export default config;
