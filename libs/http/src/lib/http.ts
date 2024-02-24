import axios from "axios";

export interface IHttpService {
  get<T>(url: string): Promise<T>;
  post<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse>;
  put<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse>;
  delete<TResponse>(url: string): Promise<TResponse>; 
}

export class HttpService implements IHttpService {
  // TODO: Create constructor for basic config

  // Create the 4 basic operation (GET, POST, PUT, DELETE)
  async get<T>(url: string): Promise<T> {
    const result = await axios.get<T>(url, { headers: { Accept: 'application/json' } });
    return result.data;
  }

  async post<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
    const result = await axios.post<TResponse>(url, body, { headers: { Accept: 'application/json' }});
    return result.data;
  }
  
  async put<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
    const result = await axios.put<TResponse>(url, body, { headers: { Accept: 'application/json' }});
    return result.data;
  }

  async delete<TResponse>(url: string): Promise<TResponse> {
    const result = await axios.delete<TResponse>(url, { headers: { Accept: 'application/json' }});
    return result.data;
  }
}
