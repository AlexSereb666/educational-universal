export class UserDto {
    id;
    login;
    email;
    isActivated;

    constructor(model) {
        this.id = model.id;
        this.login = model.login;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}
