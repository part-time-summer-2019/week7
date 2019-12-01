import React from 'react';
import PropTypes from 'prop-types';
import './css/post.css';

const Post = (props) => {
    return (
        <article>
            <h1><button onClick={e => props.postClickHandler(props.id)}>{props.title}</button></h1>
            <div>
                <div>{props.author}</div>
            </div>
        </article>
    )
};

Post.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    postClickHandler: PropTypes.func
}

export default Post;