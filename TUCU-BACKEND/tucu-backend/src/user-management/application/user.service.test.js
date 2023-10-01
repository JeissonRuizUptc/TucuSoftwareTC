const { expect } = require('chai'); // Asegúrate de que chai esté instalado como dependencia de desarrollo
const sinon = require('sinon'); // Puedes usar sinon para crear stubs o mocks

const { User } = require('../domain/User');
const { UserService } = require('./UserService');

describe('UserService Class', () => {
  it('should add a new user', async () => {
    // Crea un mock del repositorio de usuarios (IUserRepository)
    const userRepository = {
      addUser: sinon.stub().resolves(new User(1,
        'test@example.com',
        'testuser',
        'password123',
        'John',
        'Doe',
        1,
        2)),
    };

    // Crea una instancia de UserService con el mock del repositorio
    const userService = new UserService(userRepository);

    // Llama al método addUser de UserService
    const user = await userService.addUser(/* User data here */);

    // Verifica que el método addUser del repositorio haya sido llamado con los argumentos correctos
    expect(userRepository.addUser.calledOnce).to.equal(true);

    // Verifica que el resultado sea una instancia de User
    expect(user).to.be.an.instanceOf(User);

    // Puedes agregar más aserciones según sea necesario
  });

  it('should login a user and generate a token', async () => {
    // Crea un mock del repositorio de usuarios (IUserRepository)
    const userRepository = {
      findByCredentials: sinon.stub().resolves(new User(1,
        'test@example.com',
        'testuser',
        'password123',
        'John',
        'Doe',
        1,
        2)),
    };

    // Crea una instancia de UserService con el mock del repositorio
    const userService = new UserService(userRepository);

    // Llama al método login de UserService
    const loggedInUser = await userService.login('testuser', 'passpassword123word');

    // Verifica que el método findByCredentials del repositorio haya sido llamado con los argumentos correctos
    expect(userRepository.findByCredentials.calledOnceWith('testuser', 'password123')).to.equal(true);

    // Verifica que el resultado sea una instancia de User o null
    expect(loggedInUser).to.be.an.instanceOf(User).or.null;

    // Puedes agregar más aserciones según sea necesario
  });
});
