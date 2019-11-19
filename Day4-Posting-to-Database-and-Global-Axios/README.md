# Posting to a Database

### Goals
- Today we will be creating our very own database where we will be posting and getting our very own posts. 
- Addtionally, we will also learn how to add error handling and delete posts from the UI
- And finally, we will then refactor our code in order to have a global index handler for Axios 

### New Topics Covered
- How to prevent `componentDidUpdate()` from recursively rendering
- Adding a simple error handler
- Creating a database with Google Firebase
- Making post requests to a database
- Deleting a given blog posts
- Creating a globally accessible file for API requests

### Conditional updating
- So we ended the last lecture without handling the recursive rendering of `componentDidUpdate()`. If we take a look at the `Network` tab in your browser's developer tools, we will see our application constantly making http requests.
- In order to prevent this from happening, we have to add some conditionality for rendering 
```jsx
    componentDidUpdate () {
        if ( this.props.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                axios.get( 'https://jsonplaceholder.typicode.com/posts/' + this.props.id )
                    .then( response => {
                        // console.log(response);
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }
```
- Here we add logic for:
1) `loadedPost` is `null`
2) `loadedPost` is True and is not equal to the post that is currently selected
- Now we can see that the application is now only rendering when we select on a given post 


### Error Handler
- Now, let's open up our `Blog.js` file and add a new state for errors. We will then create a simple error handler for the API call 
```jsx
class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }
```
- Additionally, we will need to add some logic to our `catch` statement `componendDidMount()` in order to update our error state
- Here we will both console.log the error and change the error state to true. You can test this by altering the url 
```jsx
    .catch(err => {
        console.log(err);
        this.setState({error: true});
    });
```
- Finally, lets add some logic on the UI side to let our users know about the error 
```jsx
render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />;
            });
        }
```

### Let's Create our Own database using Google Firebase!
- Start by going to `https://firebase.google.com/` and set up an account if you don't already have a google account. 
- Once you sign-in, you will be brought to a new page where you can start a project. Add a project name and agree to the terms and conditions of using firebase. 
- Once you have selected into your project, click on `Database` on the left navigation bar and then select `Real-Time Database`, which is in the middle of the page once you scroll down slightly
- Now, let's go to the rules tab and change the read and write permission to both `true`. Now this is unsafe and we will need to add additional rules in the future. 
- Congrats, you have now created a database which we can read and write to. 

### Let's Now Add the logic to Post to the Database
- Let's now open the `NewPost.js` file and add the logic of posting to the database 
- But before we can do that, we need to import `axios`
```jsx
import axios from 'axios';
```
- Since the `NewPost` already has a state, we now have to create `postDataHandler` for adding posts. Here, we include the axios post method to our firebase database 
- One important note is that you need to include `.json` to the end of the path for the firebase data structure
```jsx
    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        axios.post('ENTER YOUR FIREBASE BASE URL + / + NAME OF PATH + .json', data)
            .then(response => {
                console.log(response);
            });
    }
```
- Now before this method can work, we have to add an event listener to the `<button>` within `FullPost`
```jsx
    <button onClick={this.postDataHandler}>Add Post</button>
```
- Now if we check our firebase database, we can see our posts there!

### Let's add 4 posts and change our Blog axios path 
- Now lets add 4 posts to populate our database and then render it to our blog
- Let's now open the Blog.js file and refactor the `componentDidMount()` to grab blog posts from our database 
- Since each post has a unique key, we will use that as our iterator and will also use it as our `id` for each of the posts 
- We will create an array of the `fetchedPosts` and `push()` the posts we want to the `state`
```jsx
    componentDidMount() {
        axios.get( 'https://byteblog-2575d.firebaseio.com/posts.json' )
        .then( response => {
            const fetchedPosts = [];
            for (let key in response.data) {
                fetchedPosts.push({
                    ...response.data[key],
                    id:key
                })
            }
            const posts = fetchedPosts.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post
                }
            })
            this.setState({posts:updatedPosts})
            console.log(this.state.posts)
        })
```
- Now the posts are rendering oldest first as we have not included any sorting logic into our API call

### Now let's fix the logic for FullPost.js 
- Now that we changed our New post logic and now don't have a unique id saved within our database, then we have to updated our `componentDidUpdate()` logic
- Since we are getting a uniquely generated key from firebase, our response will be the value of this given key. We thus have to remove the logic for checking if the current `loadedPost.id` is equivalent to `this.props.id`
```jsx
    componentDidUpdate () {
        if ( this.props.id ) {
            console.log(this.props)
            if ( !this.state.loadedPost ) {
                axios.get( 'https://byteblog-2575d.firebaseio.com/posts/' + this.props.id + '.json' )
                    .then( response => {
                        this.setState( { loadedPost: response.data } );
                        console.log(this.state.loadedPost)
                    } );
            }
        }
    }
```
- As usual, our axios call will need to have `.json` at the end of the endpoint

### Deleting a post!
- Now let's add the logic to delete a given post. In a later lecture, we will go over authenticating this delete request 
- So let's make a `deletePostHandler` using the following code
```jsx
    deletePostHandler = () => {
        axios.delete('https://byteblog-2575d.firebaseio.com/posts/' + this.props.id + '.json' )
            .then(response => {
                console.log(response);
            });
    }
```
- And of course, we have to add an event listener to the delete button 
```jsx
    <div className="Edit">
        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
    </div>
```

### Setting up a global Axios file
- Finally it is really annoying to have to embed your axios URL in each component, so let's create a `baseURL` to shorten our routes
- Within our `src` folder, let's now create an `axios.js` file 
```jsx
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;
```
- Now, we will just update the route in `Blog.js` but you can apply the same logic to the other routes 
- We now are able to simplt shorten the path in `componentDidMount()`
```jsx
    componentDidMount () {
        axios.get( '/posts.json' )
```
- Congrats! You have now fully set up a global axios file 