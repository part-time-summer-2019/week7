import React from 'react';

const FullPost = (props) => {
    return (
        <div>
            <h1>{props.fullPost.title}</h1>
            <p>{props.fullPost.body}</p>
        </div>
    );
}

export default FullPost;