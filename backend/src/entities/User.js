class User {
    constructor(id, nickname, email, password, companyId, createdDate, modifiedDate){
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.companyId = companyId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    getInfo = () => ({
        id: this.id,
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        companyId: this.companyId,
        createdDate: this.createdDate,
        modifiedDate: this.modifiedDate,
    });
}
