import axios from 'axios';
import { BASE_URL } from '@/constants';
import cookies from 'js-cookie';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

type Request = ({
  url,
  method,
  data,
  domain,
  needLogin,
  showError,
}: {
  url: string;
  method: Method;
  data?: {};
  domain?: string;
  needLogin?: boolean;
  showError?: boolean;
}) => Promise<any>;

export const request: Request = async ({
  url,
  method,
  data = {},
  domain = BASE_URL,
  needLogin = true,
  showError = true,
}) => {
  const isLogin = cookies.get('Authorization');
  return new Promise((resolve, reject) => {
    const params = {
      method,
      baseURL: domain,
      [method === 'GET' ? 'params' : 'data']: data,
      headers: {
        Authorization: cookies.get('Authorization') || '',
      },
    };

    axios(url, {
      ...params,
    })
      .then(({ data }) => {
        if (data.code === -1) {
          cookies.set('Authorization', '');
          console.log('登录失效，请重新登录');
          return;
        }
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {};
