class DaoMock {
    constructor() {
        this.destinitionItems = [];
        this.destinitionItems.push(
            {
                name: "Varus-1",
                coordinates: {
                    lat: 48.4342064,
                    lng: 35.014204,
                }
            },
            {
                name: "Varus-2",
                coordinates: {
                    lat: 48.4368389,
                    lng: 35.017541,
                }
            },
            {
                name: "Varus-3",
                coordinates: {
                    lat: 48.4027895,
                    lng: 34.9628275,
                }
            },
            {
                name: "Varus-4",
                coordinates: {
                    lat: 48.5086752,
                    lng: 35.0045603,
                }
            },
            {
                name: "Varus-5",
                coordinates: {
                    lat: 47.7815925,
                    lng: 35.1630962,
                }
            }
        );
    }


    async createDestinetionItem(item) {
        this.destinitionItems.push(item);
        return ('Destination created');
    }

    async readDestinationItems() {
        return this.destinitionItems;
    }
}
module.exports = DaoMock;
