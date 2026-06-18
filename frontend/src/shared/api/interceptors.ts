import { AxiosError } from 'axios';
import { apiInstance } from '@shared/api/base';

apiInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        console.log('Unauthorized');
        break;

      case 403:
        console.log('Forbidden');
        break;

      case 500:
        console.log('Server error');
        break;
    }

    return Promise.reject(error);
  }
);