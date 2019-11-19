import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://byteblog-2575d.firebaseio.com'
});

// Here we will create an instance for authorization later on. 
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;