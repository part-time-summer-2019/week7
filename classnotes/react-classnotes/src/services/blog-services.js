import axios from 'axios';

class BlogService {

    url = 'https://jsonplaceholder.typicode.com/posts';

    getPostList() {
        return axios.get(this.url)
            .then(response => {
                return response.data.slice(0, 3).map(post => ({
                    ...post,
                    author: 'Nikhil'
                }));
            });
    }

    getPostDetails(id) {
        return axios.get(`${this.url}/${id}`)
            .then(response => {
                return response.data;
            });
    }
}

export default BlogService;