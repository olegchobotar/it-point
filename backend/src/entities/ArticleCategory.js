class ArticleCategory {
    constructor(id, articleId, name){
        this.id = id;
        this.articleId = articleId;
        this.name = name;
    }

    getInfo = () => ({
        id: this.id,
        articleId: this.articleId,
        name: this.name,
    });
}
