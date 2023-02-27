/* eslint-disable no-underscore-dangle */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export enum ApiMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const getBody = (method: ApiMethod, body?: object) => {
  // https://github.com/axios/axios/issues/897#issuecomment-343715381
  if (body !== undefined && method === ApiMethod.DELETE) {
    return { data: body };
  }

  return body;
};

export class ApiInstance {
  api: AxiosInstance;

  constructor(baseUrl: string) {
    this.api = axios.create();
    this.api.defaults.baseURL = baseUrl;
  }

  async _request(method: ApiMethod, path: string, body?: object): Promise<any> {
    const config: AxiosRequestConfig = {
      url: path,
      method,
      data: getBody(method, body),
      withCredentials: true, // include existing cookies as part of request header
    };

    const response = await this.api.request(config);
    const { status, data } = response;

    if (status !== 500) {
      // TODO reset auth session expiry on successful api return
    }

    if (status !== 200) {
      throw Error(`Error with status: ${status}`);
    }

    return {
      status,
      data,
    };
  }

  async get(path: string): Promise<any> {
    return this._request(ApiMethod.GET, path);
  }

  async post(path: string, body: object): Promise<any> {
    return this._request(ApiMethod.POST, path, body);
  }

  async put(path: string, body: object): Promise<any> {
    return this._request(ApiMethod.PUT, path, body);
  }
}
