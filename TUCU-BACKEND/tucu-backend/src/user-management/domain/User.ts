import { Email } from './Email'; // Importa la clase Email desde el archivo Email.ts
import { Password } from './Password'; // Importa la clase Password desde el archivo Password.ts

/**
 * Clase `User` para representar usuarios con información personal y credenciales.
 */
export class User {
  private idUSERS: number; // Identificador único del usuario
  private email: Email; // Objeto Email que representa la dirección de correo electrónico del usuario
  private username: string; // Nombre de usuario del usuario
  private password: Password; // Objeto Password que representa la contraseña del usuario
  private firstname: string; // Nombre del usuario
  private surname: string; // Apellido del usuario
  private enable: number; // Indica si el usuario está habilitado o no
  private timestamp: Date;
  private id_stores_fk: number; // Identificador de la tienda asociada al usuario
  private id_roles_fk: number; // Identificador de los roles del usuario

  /**
   * Constructor de la clase `User`.
   * @param {number} idUSERS - Identificador único del usuario.
   * @param {string} email - Dirección de correo electrónico del usuario.
   * @param {string} username - Nombre de usuario del usuario.
   * @param {string} password - Contraseña del usuario.
   * @param {string} firstname - Nombre del usuario.
   * @param {string} surname - Apellido del usuario.
   * @param {number} id_stores_fk - Identificador de la tienda asociada al usuario.
   * @param {number} id_roles_fk - Identificador de los roles del usuario.
   */
  
  constructor(
    idUSERS: number,
    username: string,
    firstname: string,
    password: string,
    surname: string,
    enable: number,
    email: string,    
    timestamp: Date,
    id_stores_fk: number,
    id_roles_fk: number
  ) {
    this.idUSERS = idUSERS;
    this.email = new Email(email); // Inicializa el objeto Email con la dirección de correo electrónico proporcionada.
    this.username = username;
    this.password = new Password(password); // Inicializa el objeto Password con la contraseña proporcionada.
    this.firstname = firstname;
    this.surname = surname;
    this.enable = enable; // Por defecto, el usuario está habilitado. - Corregir Numero
    this.id_stores_fk = id_stores_fk;
    this.id_roles_fk = id_roles_fk;
  }

  /**
   * Método para obtener el identificador único del usuario.
   * @returns {number} - Identificador único del usuario.
   */
  getId(): number {
    return this.idUSERS;
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
    return this.firstname;
  }

  /**
   * Método para obtener el apellido del usuario.
   * @returns {string} - Apellido del usuario.
   */
  getSurname(): string {
    return this.surname;
  }

  /**
   * Método para verificar si el usuario está habilitado.
   * @returns {number} - 1 si el usuario está habilitado, 0 si no lo está.
   */
  isUserEnable(): number {
    return this.enable; // Compara si el valor de "enable" es igual a 1 para determinar si está habilitado.
  }

  /**
   * Método para obtener el identificador de la tienda asociada al usuario.
   * @returns {number} - Identificador de la tienda asociada al usuario.
   */
  getIdStores(): number {
    return this.id_stores_fk;
  }

  /**
   * Método para obtener el identificador de los roles del usuario.
   * @returns {number} - Identificador de los roles del usuario.
   */
  getIdRoles(): number {
    return this.id_roles_fk;
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
   * @param {number} enable - 1 para habilitar al usuario, 0 para deshabilitarlo.
   */
  setUserEnable(enable: number): void {
    this.enable = enable;
  }
}
