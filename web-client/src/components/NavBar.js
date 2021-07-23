import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavLink
} from 'reactstrap';

/*
Navbar viewer component to display the Home link.
*/
class NavBarComponent extends Component {

    url = "https://dev.azure.com/ix-devsecops-bootcamp/devsecops-bootcamp/_git/ix-devops-ci-lab"

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openInNewTab(url) {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    render() {
        return <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href={this.url} onClick={() => this.openInNewTab(this.url)}>Repository</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default NavBarComponent