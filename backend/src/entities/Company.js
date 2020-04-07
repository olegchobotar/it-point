class Company {
    constructor(id, name, description, categories, ownerId, createdDate, modifiedDate){
        this.id = id;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.ownerId = ownerId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    getInfo = () => ({
        id: this.id,
        name: this.name,
        description: this.description,
        categories: this.categories,
        ownerId: this.ownerId,
        createdDate: this.createdDate,
        modifiedDate: this.modifiedDate,
    });
}
