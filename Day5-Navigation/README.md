# Creating Navigation, Routes, and Higher-Order-Components(hoc)

### Goals 
- We will learn about a new react package called `react-route-dom` which will allow us to navigate to different routes
- We will use new `react-route-dom` components such as `<NavLink>` `<Switch>` `<Route>` `<BrowserRouter>`
- We will create higher-order-components which is an advanced technique in React which will allow us to reuse component logic. They are not a part of React, per se. But rather is a pattern which emerges from React's compositional nature. 
- We will also add a Spinner and a Logo for some flare to our application 

### New Topics
- `<Route>` - This is the most important component in React Router to understand. Its most basic responsibility is to render some UI when a location matches the route’s path 
- `<NavLink>` - This is a special version of `<Link>` which will allow us to set up links to different http paths
exclusively. In contrast, every `<Route>` that matches the location renders inclusively. 
- `<BrowserRouter>` - This is a route wrapper which allows you to create multiple Routers sharing the same history.
- HOCs we create such as `<Aux>` and `<Layout>` which will help us render adjacent components and structure our layout, respectively. 
- Some UI flare such as a `<Spinner>` which will replace our loading screen

### Let's start with Routes
- To kick things off, we have to first download our new package for routes
```bash
npm install react-router-dom
```
- Before we can jump into creating routes, we have to first update our `index.js` with `<BrowserRouter>` in order to render in order to use HTML5 history API to keep your UI in sync with the URL
```jsx
import { BrowserRouter } from 'react-router-dom';

const app = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
```

### Creating Home Container and Routes
- Now before we start making routes, we have to make a new container for the home page 
- There is a very simple home page in the `addtional_src` folder which you may copy and paste
- Now that we have two different containers, let's create some routes in our App.js file 
- Let's first start by importing our `Home` container and also importing some components from `react-router-dom`
```jsx
import { Route } from 'react-router-dom';

import Home from './containers/Home/Home';
```
- We then go ahead create our routes by using the following code
```jsx
<div className="App">
    <Route path="/" component={Home}/>
    <Route path="/blog" component={Blog}/>
</div>
```
- Now if we switch our paths from `localhost:3000` to `localhost:3000/blog`, then we will see a change in paths between our two containers
- This is great, but we have to make it more user friendly by adding a tool bar for our user for navigating through our routes. But before we can do that, we need to be able to create some navigation links to pass to our tool bar

### Creating NavLinks
- Go ahead and all the folders in the `additional_src` folder in appropriate folders! You will have to fix your routes later if you do not do so. The CSS for each of the components has already been prepopulated for you so that we can focus on the logic 
- Within the `Navigation` folder in `components`, let go to the `NavigationItem` and open the `Navigation.js` file. We will enter the following code for setting up the navigation route
```jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; 

import './NavigationItem.css';

// Here we set the link to props children to display the specific navigation path dynamically
const navigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink 
            to={props.link}
            activeClassName="active">{props.children}</NavLink>
    </li>
);

export default navigationItem;
```
- `<NavLink>` is just the same as `<Link>` except that we can add some styling to it.
- Here we use `to` for specifying the link and  pass it the `activeClassName` prop to only kick in when the class is active 
- Now let's open up our `NavigationItems.js` file and now create an unordered list of links for our given paths. We will pass this navigation list to our Tool Bar shortly.
```jsx
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/blog">Blog</NavigationItem>
        <NavigationItem link="/">Home</NavigationItem>
    </ul>
);

export default navigationItems;

export default navigationItems;
```

### Let's create a ToolBar
- Now that we have created Navigation Links, let's create a ToolBar to manage the different links
- Within our `Components` folder, let's open the `ToolBar` folder, and the `ToolBar.js` file 
- Now let's configure our `ToolBar.js` with the following code
```jsx
import React from 'react';

import './ToolBar.css';
import NavigationItems from '../Navigation/NavigationItems';


const toolbar = (props) => (
    <header className="Toolbar">
        <NavigationItems />
    </header>
);

export default toolbar;
```
- Here we are importing the `NagivationItems` into the `ToolBar` and apply a good bit of CSS to style the bar. Take a look at the CSS file whenever you have some time 

### Let's take a look at the ToolBar before moving it to a Layout component
- Let's import the toolbar to our `App.js` file in order to see what it looks like. We will move it to another location in order to improve the styling. 
```jsx
import ToolBar from './components/ToolBar/ToolBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolBar/> 
            <Route path="/blog" component={Blog}/>
            <Route path="/" component={Home}/>
      </div>
    );
  }
}

```
- Now you'll notice that the Toolbar overlaps the Blog container. We have to move it now to a HOC called `Layout` in order to improve the styling 

### Creating an Auxilary file
- So one of the rules within React is that you cannot return adjacent components unless they are the `props.children` of a higher component
- So we have to create a `hoc` file called `Aux.js` in order to help with the rendering
- Now you'll notice a new folder called `hoc`. Within `hoc`, there is a folder called `Auxilary`. Here we will create a file called `Aux.js` and write the following code
```jsx
const aux = (props) => props.children;

export default aux;
```
- We can now wrap adjacent components in our `Aux` component in order for them to properly render

### Let's Create a Layout UI and move the ToolBar
- Now let's go ahead and open `Layout.js` and work on some styling
- We will add the following code:
```jsx
import React from 'react';

import Aux from '../../hoc/Auxilary/Aux';
import './Layout.css';
import Toolbar from '../../components/ToolBar/ToolBar';

const layout = (props) => (
    <Aux>
        <ToolBar/>
        <main className="Content">
            {props.children}
        </main>
    </Aux>
);

export default layout;
```
- `Layout.js` is a hoc as it will be wrapping our entire `App.js` in a given style. This will allow our application to correctly render underneath our ToolBar
- As you'll notice here, have have two adjacent components: `ToolBar` and `main` so we have to wrap these two components in `Aux`

### Updating our App.js file 
- Now let's go ahead and open our `App.js` and add our `Layout` component
```jsx
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Blog from './containers/Blog/Blog';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Layout>
            <Route path="/blog" component={Blog}/>
            <Route path="/" component={Home}/>
          </Layout>
      </div>
    );
  }
}

export default App;

```
- Now if we save our application we can see the ToolBar correctly rendered and our NavigationItems working correctly as well
- In this case, our Routes are the props.children of the `main` component in Layout

### Setting up A Logo
- Now let's get to some fun stuff within in the design by first creating a logo. 
- I have created one for you in the assets folder, but feel free to use your own 
- Within the `Logo.js` file, we will create a `NavLink` to the home page whenever the logo is clicked and also import our `logo.png` file.
- We will enter the following code in our `Logo.js` file
- I again add some CSS magic to make sure that the your logo file size does not matter
```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

import myLogo from '../../assets/images/my-logo.png';
import './Logo.css';
// Here is how we add images to the JS file

const logo = (props) => (
    <NavLink
        to={props.link}>
        <div className="Logo">
            <img src={myLogo} alt="Logo"/>
        </div>
    </NavLink>
);

export default logo;
```

### Add the Logo to the ToolBar
- Now that we have created the logo, let's go ahead and add it to our `ToolBar.js` file
```jsx
import React from 'react';

import './ToolBar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems';

const toolbar = (props) => (
    <header className="Toolbar">
        <div className="Logo">
            <Logo link="/" />
        </div>
        <NavigationItems />
    </header>
);

export default toolbar;
```
- Now we when we look at our application, we will be able to see our logo within our `ToolBar`

### Let's add a Spinner
- We are going to get our Spinner from `https://projects.lukehaas.me/css-loaders/`
- Once you click on a Spinner and select the source code, copy and paste the `css` into `Spinner.css`, which can be found in the `UI` folder in `components`
- Then add the following code into `Spinner.js`
```jsx
import React from 'react';

import './Spinner.css'

const spinner = () => (
    <div className="Loader">Loading...</div>
);

export default spinner;
```

### Let's update the Loading message in FullPost.js
- Now that we have created a Spinner component, lets add it to the FullPost.js file in replacement for the Loading status we had previously
```jsx
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <Spinner/>
        }
```
- Now that when we click on a given post, we will briefly see the Spinner pop up.

