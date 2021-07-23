import React, { Component } from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import GroceryCatalogList from "./components/GroceryCatalogList";
import GroceryCatalogEdit from "./components/GroceryCatalogEdit";
import Api from "./components/Api";
import NavBarComponent from "./components/NavBar";
import logo from './logo.svg';

const api = new Api();

class App extends Component {
    render() {
        const navbar = <NavBarComponent/>;
        // Returns three routes. Home route, product list route and route for editing and adding new items.
        return (
            <Router>
                <Switch>
                    <Route
                        path='/'
                        exact={true}
                        render={(props) => <Home {...props} api={api} navbar={navbar}></Home>}
                    />
                    <Route
                        path='/grocery-catalog'
                        exact={true}
                        render={
                            (props) => <GroceryCatalogList {...props} api={api} navbar={navbar}/>
                        }
                    />
                    <Route
                        path='/grocery-catalog/:id'
                        render={
                            (props) => <GroceryCatalogEdit {...props} api={api} navbar={navbar}/>
                        }
                    />
                </Switch>
            </Router>
        )
    }
}

export default App;
