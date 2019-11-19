import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

// According to the lifecycle hooks - we should use componentDidMount() for its side-effects on making http requests
// it does not affect your react logic but it has the side effect of fetching new data, which has the side-effect on your application
// but it should not be used for updating state since it will cause a re-render
class Blog extends Component {
    state = {
        posts:[],
        selectedPostId: null
    }
    
    // here we use an axios method for sending get requests
    // we will use promises so that we can wait for the entire https call - 
    //then() takes a function as input and this function will get executed once the promise resolves
    // We have to setState() after the promise has been resolved so that the response.data may be saved to the current state 
    // we will also transform the posts prior to setState()
    componentDidMount() {
        axios.get( 'https://jsonplaceholder.typicode.com/posts' )
        .then( response => {
            // This gets only the first 4 items of the response data
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Gabby'
                }
            })
            this.setState({posts:updatedPosts})
            console.log(this.state.posts)
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        // title is passed here from Post.js as a prop
        // remember to include the key property with each post
        // we use an arrow function here instead of the standard {this.postSelectedHandler} in order to
        // include the post.id as an argument to that method
        const posts = this.state.posts.map(post => {
            return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />;
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    {/* the id from post should be passed here so that we can select a specific post to view by ID */}
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;