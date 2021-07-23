import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

/*
A simple Home page for the Grocery Catalog Frontend.
Displays a list of products and a button to open and edit items.
*/

class Home extends Component {

    render() {
        return (
            <div className="app">
                {this.props.navbar}
                <Container fluid>
                    <div>
                        <Button color="secondary">
                            <Link className="app-link" to="/grocery-catalog">Manage Grocery Catalog</Link>
                        </Button>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home;