declare module '@woocommerce/woocommerce-rest-api' {
  export interface WooCommerceRestApiOptions {
    url: string;
    consumerKey: string;
    consumerSecret: string;
    version?: string;
    wpAPIPrefix?: string;
    queryStringAuth?: boolean;
    encoding?: string;
    timeout?: number;
    axiosConfig?: any;
  }

  export interface WooCommerceRestApiResponse {
    data: any;
    status: number;
    headers: any;
  }

  export default class WooCommerceRestApi {
    constructor(options: WooCommerceRestApiOptions);
    get(endpoint: string, params?: any): Promise<WooCommerceRestApiResponse>;
    post(endpoint: string, data: any, params?: any): Promise<WooCommerceRestApiResponse>;
    put(endpoint: string, data: any, params?: any): Promise<WooCommerceRestApiResponse>;
    delete(endpoint: string, params?: any): Promise<WooCommerceRestApiResponse>;
    options(endpoint: string, params?: any): Promise<WooCommerceRestApiResponse>;
  }
} 