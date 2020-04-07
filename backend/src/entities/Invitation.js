class Invitation {
    constructor(id, companyId, token, expiredAt){
        this.id = id;
        this.companyId = companyId;
        this.token = token;
        this.expiredAt = expiredAt;
    }

    getInfo = () => ({
        id: this.id,
        companyId: this.companyId,
        token: this.token,
        expiredAt: this.expiredAt,
    });
}
