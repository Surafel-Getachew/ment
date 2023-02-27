import config from '../config';
import { ITenant } from '../types/ITenant';
import { ApiInstance } from './ApiInstance';
import wrapWithMock from './mockApi';

let host = window.location.origin;
host = host.replace(':3000', ':5200'); // Local dev
const backendUrl = `${host}/api`;
export const aspireApi: ApiInstance = new ApiInstance(backendUrl);

// TODO config
// wrapWithMock(aspireApi.api);

// Note: add additional apis here - learnosity, badgr etc
