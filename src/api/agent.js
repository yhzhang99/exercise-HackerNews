import axios from 'axios';
// import router from '../router/index';

// import commonStore from '@/store/commonStore';
// import authStore from '@/store/authStore';

const API_ROOT = 'https://hacker-news.firebaseio.com/v0/';
const MOCK_ROOT = '/mock';

const requestConfigAdapter = (config) => {
  let API_BASE = API_ROOT;
  if (config.isMock) {
    API_BASE = MOCK_ROOT;
  }

  return { url: `${API_BASE}${config.url}` };
};

// const handleErrors = (err) => {
//   if (err && err.response && err.response.status === 401) {
//     authStore.actions.logout();
//   } else if (err && err.response && err.response.status === 404) {
//     console.log('123');
//     router.replace({
//       path: '/404',
//     });
//   }
//   return Promise.reject(err.response);
// };

const responseData = (res) => res.data;

// const tokenPlugin = (config) => {
//   if (commonStore.state.token) {
//     config.headers['authorization'] = `Token ${commonStore.state.token}`;
//   }

//   return config;
// };

const request = {};

// axios.interceptors.request.use(tokenPlugin);
// axios.interceptors.response.use(null, handleErrors);

['delete', 'get', 'head', 'options'].forEach((method) => {
  request[method] = ({ url, isMock = false }) => {
    const { url: apiUrl } = requestConfigAdapter({ url, isMock });
    return axios[method](apiUrl).then(responseData);
  };
});

['post', 'put', 'patch'].forEach((method) => {
  request[method] = ({ url, payload, isMock = false }) => {
    const { url: apiUrl } = requestConfigAdapter({ url, isMock });
    return axios[method](apiUrl, payload).then(responseData);
  };
});

export default request;
