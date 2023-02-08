export class Product {
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;

    constructor() {
        this.id = -1;
        this.name = '';
        this.price = 0;
        this.url = '';
        this.description = '';
    }
}
