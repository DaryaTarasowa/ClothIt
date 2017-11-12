import fetch from 'isomorphic-fetch';
import Config from '../../server1/config';

// export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
//   process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
//   '/api';
let API_URL = '';

export default function callApi(microservice = 'server1', endpoint, method = 'get', body) {
    switch (microservice) {
        case 'server1':
            API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
              process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
              'http://localhost:80/api';
            break;
        case 'server2':
            API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
              process.env.BASE_URL || (`http://localhost:81/api`) :
              'http://localhost:8081/api';
              break;
        default:
            API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
              process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
              'http://localhost:80/api';
    }
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
        console.log(response.error);
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
