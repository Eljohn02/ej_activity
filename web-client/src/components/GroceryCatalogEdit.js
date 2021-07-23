import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Alert,
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';


/*
Component that enables editing of existing products from the grocery catalog and adding new ones.
*/
class GroceryCatalogEdit extends Component {

    emptyItem = {
        productName: '',
        type: '',
        manufacturer: '',
        price: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            errorMessage: null,
            isCreate: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this.state.isCreate = this.props.match.params.id === 'new';
        if (!this.state.isCreate) {
            const response = await this.props.api.getById(this.props.match.params.id);
            const groceryCatalog = await response.json();
            this.setState({item: groceryCatalog});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item, isCreate} = this.state;

        let result = isCreate ?  await this.props.api.create(item) : await this.props.api.update(item);

        if (!result.ok) {
            this.setState({
                errorMessage: `Failed to ${isCreate ? 'create' : 'update'} record: ${result.status} ${result.statusText}`
            });
        } else {
            this.setState({
                errorMessage: null
            });
            this.props.history.push('/grocery-catalog');
        }
    }

    render() {
        const {item, errorMessage, isCreate} = this.state;
        const title = <h2>{isCreate ? 'Add a grocery product' : 'Edit a grocery product'}</h2>;

        return (
            <div>
                {this.props.navbar}
                <Container style={{textAlign:'left'}}>
                    {title}
                    {errorMessage ?
                        <Alert color="warning">{errorMessage}</Alert> : null
                    }
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <FormGroup className="col-md-8 mb-3">
                                <Label for="name">Name</Label>
                                <Input type="text" name="productName" id="productName" value={item.productName || ''} 
                                    onChange={this.handleChange} autoComplete="productName"/>
                            </FormGroup>
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="type">Product Type</Label>
                                <Input type="text" name="type" id="type" value={item.type || ''}
                                    onChange={this.handleChange} autoComplete="type"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="manufacturer">Manufacturer</Label>
                                <Input type="text" name="manufacturer" id="manufacturer" 
                                    value={item.manufacturer || ''}
                                    onChange={this.handleChange} autoComplete="manufacturer"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="text" name="price" id="price" value={item.price || ''}
                                    onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit">Save</Button>
                                <Button color="secondary" tag={Link} to="/grocery-catalog">Cancel</Button>
                            </FormGroup>
                        </div>
                    </Form>
                </Container>
            </div>
        );
    }

}

export default GroceryCatalogEdit;