const Email = require('./Email');
const Password = require('./Password');

class User {
  constructor(id_user, email, username, password, firstName, surName, id_store, id_roles) {
    this.id_user = id_user;
    this.email = new Email(email);
    this.username = username;
    this.password = new Password(password);
    this.firstName = firstName;
    this.surName = surName;
    this.enable = true; // Por defecto, el usuario está habilitado
    this.id_store = id_store;
    this.id_roles = id_roles;
  }

  getId() {
    return this.id_user;
  }

  getEmail() {
    return this.email;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getFirstName() {
    return this.firstName;
  }

  getSurname() {
    return this.surName;
  }

  isUserEnable() {
    return this.enable;
  }

  getIdStores() {
    return this.id_store;
  }

  getIdRoles() {
    return this.id_roles;
  }

  setPassword(newPassword) {
    this.password = new Password(newPassword);
  }

  setUserEnable(enable) {
    this.enable = enable;
  }
}

module.exports = User;
