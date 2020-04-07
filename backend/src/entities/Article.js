class Article {
    constructor(id, title, onlyForCompany, imageUrl, content, authorId, createdDate, modifiedDate){
        this.id = id;
        this.title = title;
        this.onlyForCompany = onlyForCompany;
        this.imageUrl = imageUrl;
        this.content = content;
        this.authorId = authorId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    getInfo = () => ({
        id: this.id,
        title: this.title,
        onlyForCompany: this.onlyForCompany,
        imageUrl: this.imageUrl,
        content: this.content,
        authorId: this.authorId,
        createdDate: this.createdDate,
        modifiedDate: this.modifiedDate,
    });
}
