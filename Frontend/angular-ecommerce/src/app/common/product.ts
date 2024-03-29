export class Product {

    constructor(
        public id: string,
        public sku: String,
        public name: string,
        public description: String,
        public unitPrice: number,
        public imageUrl: string,
        public active: boolean,
        public unitsInStock: number,
        public dateCreated: Date,
        public lastUpdated: Date
    ){}
}
