import fetch from 'isomorphic-fetch';

// export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
//   process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
//   '/api';
let API_URL = '';

export default function callApi(microservice, endpoint, method = 'get', body) {
    console.log('Entering apiCaller');
    switch (microservice) {
        case 'server':
            API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
              process.env.BASE_URL || (`http://localhost:80/api`) :
              '/api';
            break;
        case 'server2':
            API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
              process.env.BASE_URL || (`http://localhost:8081/api`) :
              'http://localhost:8081/api';
              break;
        default:
            API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
              process.env.BASE_URL || (`http://localhost:80/api`) :
              '/api';
    }
    let request_url = API_URL+'/'+endpoint;
    console.log(request_url);

  return fetch(request_url, {
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
