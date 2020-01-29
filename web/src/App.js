import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css'
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

export default function App() {
    return (
        <Router>
            <div className='app'>
                <nav>
                    <ul>
                        <li>
                            <Link to="/movies">Movie List</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/movies/:id" component={MovieDetails} />
                    <Route exact path="/movies" component={MovieList} />
                    <Route exact path="/">
                        <h2>Welcome to the Movie app!</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}