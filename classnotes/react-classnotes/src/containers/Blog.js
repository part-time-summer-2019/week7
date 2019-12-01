import React from 'react';
import axios from 'axios';
import BlogService from '../services/blog-services';
import Post from '../components/post';
import FullPost from '../components/fullpost';

export default class Blog extends React.Component {
    state = {
        posts: [],
        fullPost: {}
    };

    blogService = new BlogService();

    componentDidMount() {
        this.blogService.getPostList()
            .then(posts => {
                this.setState({
                    posts
                });
            });
    }

    getPostDetails = (id) => {
        this.blogService.getPostDetails(id)
            .then(data => {
                this.setState({ fullPost: data });
            });
    }

    render() {
        return (
            <div>
                <section>
                    {
                        this.state.posts.map(post => {
                            return <Post key={post.id}
                                id={post.id}
                                title={post.title}
                                body={post.body}
                                author={post.author}
                                postClickHandler={this.getPostDetails} />
                        })
                    }
                </section>
                <section>
                    <FullPost fullPost={this.state.fullPost} />
                </section>
            </div>
        )
    }
}