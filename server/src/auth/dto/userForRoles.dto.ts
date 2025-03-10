export class UserForRolesDto {
  id;
  login;
  email;
  isActivated;
  jsonSettings;
  roles;
  permissions;

  constructor(model) {
    this.id = model.id;
    this.login = model.login;
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.jsonSettings = JSON.parse(model.jsonSettings);

    this.roles = model.roles?.map((role) => ({
      id: role.id,
      name: role.name,
      slug: role.slug,
    }));

    const permissionsSet = new Map();
    model.roles?.forEach((role) => {
      role.permissions?.forEach((permission) => {
        if (!permissionsSet.has(permission.slug)) {
          permissionsSet.set(permission.slug, {
            id: permission.id,
            name: permission.name,
            slug: permission.slug,
          });
        }
      });
    });

    this.permissions = Array.from(permissionsSet.values());
  }
}
