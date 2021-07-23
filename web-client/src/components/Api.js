class Api {
    constructor(authToken) {
        this.authToken = authToken;
    }

    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    BASE_URL = '/api/catalog';

    createHeaders() {
        return this.authToken ? {
            ...this.headers,
            'Authorization': 'Bearer' + this.authToken
        } : this.headers;
    }

    // Get all items from the catalog
    async getAll() {
        return await fetch(this.BASE_URL, {
            method: 'GET',
            headers: this.createHeaders()
        });
    }

    // Get items by its ID
    async getById(id) {
        return await fetch(`${this.BASE_URL}/${id}`, {
            method: 'GET',
            headers: this.createHeaders()
        });
    }

    // Delete an item by its ID
    async delete(id) {
        return await fetch(`${this.BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: this.createHeaders()
        });
    }

    // Update an existing item
    async update(item) {
        return await fetch(`${this.BASE_URL}/${item.id}`, {
            method: 'PUT',
            headers: this.createHeaders(),
            body: JSON.stringify(item)
        });
    }

    // Create a new item
    async create(item) {
        return await fetch(this.BASE_URL, {
            method: 'POST',
            headers: this.createHeaders(),
            body: JSON.stringify(item)
        });
    }
}

export default Api;