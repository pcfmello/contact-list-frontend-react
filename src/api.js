import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
    headers: {'X-Custom-Header': 'foobar'}
  });