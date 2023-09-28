const chai = require('chai');
const expect = chai.expect;
const User = require('../../src/domain/models/User'); // Ajusta la ruta según la ubicación de tu archivo User.js

describe('User', () => {
  it('should create a user with valid email and password', () => {
    const user = new User(
      1,
      'test@example.com',
      'username',
      'Password123',
      'John',
      'Doe',
      1,
      2
    );

    expect(user.getId()).to.equal(1);
    expect(user.getEmail().getValue()).to.equal('test@example.com');
    expect(user.getUsername()).to.equal('username');
    expect(user.getPassword().getValue()).to.equal('Password123');
    expect(user.getFirstName()).to.equal('John');
    expect(user.getSurname()).to.equal('Doe');
    expect(user.isUserEnable()).to.equal(true);
    expect(user.getIdStores()).to.equal(1);
    expect(user.getIdRoles()).to.equal(2);
  });

  it('should create an empty user', () => {
    const user = User.createEmpty();

    expect(user.getId()).to.equal(null);
    expect(user.getEmail().getValue()).to.equal('');
    expect(user.getUsername()).to.equal('');
    expect(user.getPassword().getValue()).to.equal('');
    expect(user.getFirstName()).to.equal('');
    expect(user.getSurname()).to.equal('');
    expect(user.isUserEnable()).to.equal(true);
    expect(user.getIdStores()).to.equal(null);
    expect(user.getIdRoles()).to.equal(null);
  });

  it('should set a new password', () => {
    const user = User.createEmpty();
    const newPassword = 'NewPassword123';

    user.setPassword(newPassword);

    expect(user.getPassword().getValue()).to.equal(newPassword);
  });

  it('should set user enable to false', () => {
    const user = User.createEmpty();

    user.setUserEnable(false);

    expect(user.isUserEnable()).to.equal(false);
  });
});
