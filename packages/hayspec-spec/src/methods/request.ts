import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Configuration interface.
 */
export { AxiosRequestConfig, AxiosResponse };

/**
 * Performs a HTTP request.
 * @param config Axios configuration.
 */
export async function request(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return axios.create({
    baseURL: 'http://localhost:4445',
  })(config).catch((err) => {
    if (err.response) {
      return err.response;
    }
    throw err;
  });
}
