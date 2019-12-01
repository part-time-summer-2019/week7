import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Link, useRouteMatch, useParams } from 'react-router-dom';

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <ul>
                        <li><NavLink to="/users" activeStyle={{
                            fontWeight: "bold",
                            color: "grey"
                        }}>Users</NavLink></li>
                    </ul>
                    <ul>
                        <li><Link to="/topics">Topics</Link></li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/about">
                        <About></About>
                    </Route>
                    <Route path="/users">
                        <Users></Users>
                    </Route>
                    <Route path="/topics">
                        <Topics></Topics>
                    </Route>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>
}

function Home() {
    return <h2>Home</h2>
}

function Topics() {
    let match = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>

            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            {/* The Topics page has its own <Switch> with more routes
            that build on the /topics URL path. You can think of the
            2nd <Route> here as an "index" page for all topics, or
            the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}

export default AppRouter;