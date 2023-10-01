import { User } from '../src/domain/User'; // Ajusta la ruta según la ubicación real de tu clase User
import { Email } from '../src/domain/Email'; // Ajusta la ruta según la ubicación real de tu clase Email

// Caso de prueba para crear una instancia de User
test('Crear una instancia de User', () => {
  const user = new User(1, 'user@example.com', 'username', 'password', 'John', 'Doe', 1, 2);
  expect(user).toBeInstanceOf(User);
});

// Caso de prueba para obtener el identificador del usuario
test('Obtener el identificador del usuario', () => {
  const user = new User(1, 'user@example.com', 'username', 'password', 'John', 'Doe', 1, 2);
  expect(user.getId()).toBe(1);
});

// Caso de prueba para obtener el objeto Email
test('Obtener el objeto Email del usuario', () => {
  const user = new User(1, 'user@example.com', 'username', 'password', 'John', 'Doe', 1, 2);
  const email = user.getEmail();
  expect(email).toBeInstanceOf(Email);
  expect(email.getValue()).toBe('user@example.com');
});

// Caso de prueba para cambiar la contraseña del usuario
test('Cambiar la contraseña del usuario', () => {
  const user = new User(1, 'user@example.com', 'username', 'password', 'John', 'Doe', 1, 2);
  user.setPassword('newPassword');
  expect(user.getPassword().getValue()).toBe('newPassword');
});

// Caso de prueba para habilitar o deshabilitar al usuario
test('Habilitar o deshabilitar al usuario', () => {
  const user = new User(1, 'user@example.com', 'username', 'password', 'John', 'Doe', 1, 2);
  user.setUserEnable(false);
  expect(user.isUserEnable()).toBe(false);
});
