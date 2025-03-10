export class UserDto {
  id;
  login;
  email;
  isActivated;
  jsonSettings;

  constructor(model) {
    this.id = model.id;
    this.login = model.login;
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.jsonSettings = JSON.parse(model.jsonSettings);
  }
}
