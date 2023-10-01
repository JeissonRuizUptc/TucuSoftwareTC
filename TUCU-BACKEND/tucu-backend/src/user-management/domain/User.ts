import { Email } from './Email'; // Importa la clase Email desde el archivo Email.ts
import { Password } from './Password'; // Importa la clase Password desde el archivo Password.ts

/**
 * Clase `User` para representar usuarios con información personal y credenciales.
 */
export class User {
  private id_user: number; // Identificador único del usuario
  private email: Email; // Objeto Email que representa la dirección de correo electrónico del usuario
  private username: string; // Nombre de usuario del usuario
  private password: Password; // Objeto Password que representa la contraseña del usuario
  private firstName: string; // Nombre del usuario
  private surName: string; // Apellido del usuario
  private enable: boolean; // Indica si el usuario está habilitado o no
  private id_store: number; // Identificador de la tienda asociada al usuario
  private id_roles: number; // Identificador de los roles del usuario

  /**
   * Constructor de la clase `User`.
   * @param {number} id_user - Identificador único del usuario.
   * @param {string} email - Dirección de correo electrónico del usuario.
   * @param {string} username - Nombre de usuario del usuario.
   * @param {string} password - Contraseña del usuario.
   * @param {string} firstName - Nombre del usuario.
   * @param {string} surName - Apellido del usuario.
   * @param {number} id_store - Identificador de la tienda asociada al usuario.
   * @param {number} id_roles - Identificador de los roles del usuario.
   */
  
  constructor(
    id_user: number,
    email: string,
    username: string,
    password: string,
    firstName: string,
    surName: string,
    id_store: number,
    id_roles: number
  ) {
    this.id_user = id_user;
    this.email = new Email(email); // Inicializa el objeto Email con la dirección de correo electrónico proporcionada.
    this.username = username;
    this.password = new Password(password); // Inicializa el objeto Password con la contraseña proporcionada.
    this.firstName = firstName;
    this.surName = surName;
    this.enable = true; // Por defecto, el usuario está habilitado.
    this.id_store = id_store;
    this.id_roles = id_roles;
  }

  /**
   * Método para obtener el identificador único del usuario.
   * @returns {number} - Identificador único del usuario.
   */
  getId(): number {
    return this.id_user;
  }

  /**
   * Método para obtener el objeto Email que representa la dirección de correo electrónico del usuario.
   * @returns {Email} - Objeto Email que contiene la dirección de correo electrónico del usuario.
   */
  getEmail(): Email {
    return this.email;
  }

  /**
   * Método para obtener el nombre de usuario del usuario.
   * @returns {string} - Nombre de usuario del usuario.
   */
  getUsername(): string {
    return this.username;
  }

  /**
   * Método para obtener el objeto Password que representa la contraseña del usuario.
   * @returns {Password} - Objeto Password que contiene la contraseña del usuario.
   */
  getPassword(): Password {
    return this.password;
  }

  /**
   * Método para obtener el nombre del usuario.
   * @returns {string} - Nombre del usuario.
   */
  getFirstName(): string {
    return this.firstName;
  }

  /**
   * Método para obtener el apellido del usuario.
   * @returns {string} - Apellido del usuario.
   */
  getSurname(): string {
    return this.surName;
  }

  /**
   * Método para verificar si el usuario está habilitado.
   * @returns {boolean} - true si el usuario está habilitado, false si no lo está.
   */
  isUserEnable(): boolean {
    return this.enable;
  }

  /**
   * Método para obtener el identificador de la tienda asociada al usuario.
   * @returns {number} - Identificador de la tienda asociada al usuario.
   */
  getIdStores(): number {
    return this.id_store;
  }

  /**
   * Método para obtener el identificador de los roles del usuario.
   * @returns {number} - Identificador de los roles del usuario.
   */
  getIdRoles(): number {
    return this.id_roles;
  }

  /**
   * Método para cambiar la contraseña del usuario.
   * @param {string} newPassword - Nueva contraseña del usuario.
   */
  setPassword(newPassword: string): void {
    this.password = new Password(newPassword); // Actualiza la contraseña del usuario.
  }

  /**
   * Método para habilitar o deshabilitar al usuario.
   * @param {boolean} enable - true para habilitar al usuario, false para deshabilitarlo.
   */
  setUserEnable(enable: boolean): void {
    this.enable = enable; // Actualiza el estado de habilitación del usuario.
  }
}
