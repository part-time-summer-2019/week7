import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

// Here we use componentDidUpdate bc we are checking specific post which will re-render the page
// we now create a state for loadedPost which will allow us to access the properties of a given response
class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate () {
        // We include this if statement to make sure we are not checking if the id is null
        // then select the response for a given id
        // We also include an addtional conditional for `!this.state.loadedPost` in order to prevent our application from recursively rendering
        if ( this.props.id ) {
            if (!this.state.loadedPost) {
                axios.get( 'https://jsonplaceholder.typicode.com/posts/' + this.props.id )
                .then( response => {
                    // console.log(response);
                    this.setState( { loadedPost: response.data } );
                });
            }
        }
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        // Here we have to create a check to see if request has been completed
        // it will show a loading sign if not 
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading....!</p>
        }
        // Here we use state.loadedPost because we want to confirm that the loadedPost value is not null
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    {/* We have to use this.state specifically here because we are setting a new state when we select a post */}
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;