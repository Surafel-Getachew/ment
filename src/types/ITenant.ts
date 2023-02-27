export enum AuthType {
  PASSWORD = 'password',
  SSO = 'sso',
}

export type TenantAuthPreferences = {
  authType: AuthType;
  domain?: string;
  awsRegion?: string;
  userPoolId?: string;
  userPoolAppId?: string;
  providerName?: string;
  redirectSignIn?: string;
  redirectSignOut?: string;
}

export type TenantUIPreferences = {
  primaryColor: string,
  secondaryColor: string,
  iconUrl: string,
  iconHeight: number,
  favIconUrl: string,
}

export type TenantCopyPreferences = {
  helpText: string,
}

export interface ITenant {
  id: string;
  name: string;
  description: string;
  domain: string;
  uiPreferences: TenantUIPreferences;
  authPreferences: TenantAuthPreferences;
  copyPreferences: TenantCopyPreferences;
}
