import React, { Component } from 'react';
import {
    Alert,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

/*
Component that list grocery products in a responsive, card-style grid layout.
*/

// Generate the component containing the items
const Groceries = (props) => (
    <div className="grocery-catalog-container p-2 m-2 d-flex flex-column">
        <h3>{props.productName}</h3>
        <div className="grocery-catalog-body">
            <div className="subtitle-container">
                <div>Price: ${props.price}</div>
                <div>Product Type: {props.type}</div>
                <div>Manufacturer: {props.manufacturer}</div>
            </div>
        </div>

        <div className="grocery-catalog-footer">
            <Button color="secondary" tag={Link} to={'/grocery-catalog/' + props.id}>Edit</Button>
            <Button color="danger" onClick={() => props.remove(props.id)}>Delete</Button>
        </div>
    </div>
);

class GroceryCatalogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groceryCatalog: [],
            isLoading: true,
            errorMessage: null
        };
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        const resp = await this.props.api.getAll();
        if (!resp.ok) {
            this.setState({
                errorMessage: `Failed to load the grocery catalog: ${resp.status} ${resp.statusText}`,
                isLoading: false
            });
        }
        else {
            const body = await resp.json();
            // _embedded body gets repository rest resource rel value
            const groceryCatalog = body._embedded.grocerycatalog;
            this.setState({
                groceryCatalog: groceryCatalog,
                isLoading: false,
                errorMessage: null
            });
        }
    }

    async remove(id) {
        let resp = await this.props.api.delete(id);
        if (!resp.ok) {
            this.setState({
                errorMessage: `Failed to delete grocery catalog: ${resp.status} ${resp.statusText}`
            });
        }
        else {
            let updatedGroceryCatalog = [...this.state.groceryCatalog].filter(i => i.id !== id);
            this.setState({
                groceryCatalog: updatedGroceryCatalog,
                errorMessage: null
            });
        }
    }

    render() {
        const {
            groceryCatalog,
            isLoading,
            errorMessage
        } = this.state;

        if (isLoading) {
            return <p>Loading...</p>
        }

        return (
            <div>
                {this.props.navbar}
                <div className="d-flex flex-row justify-content-between p-3">
                    <h3 className="grocery-catalog-title">Grocery Products Catalog</h3>
                    <Button color="success" tag={Link} to="/grocery-catalog/new">Add New Product</Button>
                </div>
                {errorMessage ?
                    <div className="d-flex flex-row justify-content-center">
                        <Alert color="warning" style={{ flex: 1, maxWidth: '80%' }}>
                            {errorMessage}
                        </Alert>
                    </div> : null
                }
                <div className="d-flex flex-row flex-container flex-wrap justify-content-center">
                    {groceryCatalog.map(groceryCatalog =>
                        <Groceries {...groceryCatalog} remove={this.remove.bind(this)} key={groceryCatalog.id} />
                    )}
                    {!groceryCatalog || groceryCatalog.length === 0 ? <p>No products available</p> : null}
                </div>
            </div>
        );
    }
}

export default GroceryCatalogList;
