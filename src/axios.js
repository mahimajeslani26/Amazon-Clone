import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/clone-f85ec/us-central1/api/',

  //'https://us-central1-clone-f85ec.cloudfunctions.net/api',
  //'http://localhost:5001/clone-f85ec/us-central1/api/',
});

export default instance;
