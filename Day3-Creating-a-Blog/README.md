# Creating Your very own blog! 

### Goals
- Over the next few days you will create you very own blog page! You will be able to retrieve posts from a database, post blogs to a database, view specific posts, and delete specific posts. 
- Today, we will learn how to make API calls from server and dynamically display the posts from a given data base. We will use an example database `https://jsonplaceholder.typicode.com/posts` for first retrieving posts. In the next lecture, we will then learn how to post blogs to a database

### New topics covered
- axios for CRUD methods 
- Lifecycle Hooks such as `componentDidMount` and `compnentDidUpdate`

### Let's take a look at our starting project
- We have FullPosts, NewPost, Post as components and Blog as our actual container
- The project is setup with the CSS, so that we can worry more about the actual code
- To kick things off enter the following commands in your terminal:
```bash
npm install
npm install axios 
npm start
```
- You should see a full set up UI for a blog 

### Why use Axios
- So we can use the standard JS `fetch()` functionality, but in this lesson, we will be using a third-party package called Axios
- `fetch()` generally works for most http requests, but don't work with some.

### What are LifeCycle Hooks?
- So where do we add the logic for making these http request? We will use the lifecycle hook `componentDidMount` for making the request. But what are lifecycle hooks?
- React Hooks were invented by the React team to introduce state management and side-effects in function components. It’s their way of making it more effortless to use only React function components without the need to refactor a React function component to a React class component for using lifecycle methods, in order to use have side-effects, or local state. React Hooks enable us to write React applications with only function components.
- When a component is defined on a page in our application, we can't depend upon it being available in the DOM immediately as we're defining virtual nodes.
- Instead, we have to wait until the component itself has actually mounted in the browser. 

### What is Mounting?
- Since we're defining virtual representations of nodes in our DOM tree with React, we're not actually defining DOM nodes. Instead, we're building up an in-memory view that React maintains and manages for us. When we talk about mounting, we're talking about the process of converting the virtual components into actual DOM elements that are placed in the DOM by React.
- This is useful for things such as fetching data to populate the component. 
For instance, let's say that we want to use our Blog to display blog posts, for example. We will want to load these events only when the data itself is going to be rendered.


### Let's now make our first Axios request
- Let's first import `axios` into our Blog.js file 
```jsx
import axios from 'axios';
```
- Now, lets create our first lifecyle hook `componentDidMount()` in our Blog.js file as well
```jsx
class Blog extends Component {
    componentDidMount() {
        axios.get( 'https://jsonplaceholder.typicode.com/posts' )
        .then( response => {
            console.log(response)
        });
    }
```
- This code occurs asynchrnously, so the application will need a bit of time in order to actually load the post 
- Now if we take a look at our console, we will see that the http request was successful 

### Now let's dynamically render these posts
- We first start by creating a new state within the Blog container for the posts 
```jsx
class Blog extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
```
- Now instead of simply printing out the entire reponse, let's just get a `slice` of the array 
- We will map the posts and update the current state of the Blog to simply have 4 posts 
```jsx
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
```
- From there we then have to map the posts within the render statement in order to dynamically render the posts
```jsx
const posts = this.state.posts.map(post => {
    return <Post 
        key={post.id} 
        title={post.title} 
        author={post.author}/>;
});
```
- Now we can remove `<Post/>` from the return statement and replace it with `{posts}`
```jsx
    <div>
        <section className="Posts">
            {posts}
        </section>
        <section>
            <FullPost/>
        </section>
        <section>
            <NewPost />
        </section>
    </div>
```

### Time to Update Post.js
- We now see the correct number of `posts` showing up, but we don't see any data... so we have to make sure that we pass this props to a given post 
- Let's now update the Post.js file 
```jsx
const post = (props) => (
    <article className="Post">
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);
```
- Let's also update the Post.css file and change the `width` to `250px` to make the posts look better

### Now let's View a FullPost
- Let's now update the state in order to select a given postID
```jsx
    state = {
        posts: [],
        selectedPostId: null
    }
```
- Now let's create a `postSelectHandler` method within our Blog.js file and add the clicked prop to post 
```jsx
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />;
        });

```
- And as usual, we have to connect this method to the Post component
```jsx
const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);
```
- Now this does not do anything just yet, beacuase we now have to work on the Full Post component in order to render the FullPost we selected
- Additionally, let's go ahead and add this prop to the FullPost component. We will use this ID in order to query a specific post 
```jsx
<section>
    <FullPost id={this.state.selectedPostId} />
</section>
```

### Now let's work within the FullPost.js file 
- So let's start by adding state of the Full Post component
```jsx
class FullPost extends Component {
    state = {
        loadedPost: null
    }
```
- Now we will use a different lifecycle hook called `componendDidUpdate()`
- `componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render. And we are updating the current state of the application based on the ID we selected
- Addtionally, we add some logic which will prevent our application from recursively rendering by checking if `!this.state.loadedPost`
```jsx
    componentDidUpdate () {
        if ( this.props.id ) {
            if(!this.state.loadedPost) {
                axios.get( 'https://jsonplaceholder.typicode.com/posts/' + this.props.id )
                    .then( response => {
                        // console.log(response);
                        this.setState( { loadedPost: response.data } );
                });
            }
        }
    }
```
- Now we will update the render section of FullPost by adding some style and some logic to post
```jsx
    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( this.props.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
```
- Finally we have to pass state to title and body
- 
```jsx
if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
    return post;
```
- Congratulations! You have now succesfully created an application which dynamically displays data from an API 