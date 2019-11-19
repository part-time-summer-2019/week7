import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

// we also include error as a state so that we can render an error message whenever it occurs
class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }
    
    componentDidMount () {
        axios.get( '/posts.json' )
        .then( response => {
            const fetchedPosts = [];
            for (let key in response.data) {
                fetchedPosts.push({
                    ...response.data[key],
                    id:key
                })
            }
            console.log(fetchedPosts)
            const posts = fetchedPosts.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post
                }
            })
            this.setState({posts:updatedPosts})
            console.log(this.state.posts)
        })
        // Here we now include a variable for handling errors - the default posts variable is an error message
        .catch(err => {
            console.log(err)
            this.setState({error:true})
        })
    }
    

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        // If there is no error then handle normally otherwise - return the posts error message
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id}
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />;
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
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