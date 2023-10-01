/**
 * Clase `Email` para representar direcciones de correo electrónico.
 */
export class Email {

  // Propiedad privada para almacenar el valor de la dirección de correo electrónico.
  private value: string;

  /**
   * Constructor de la clase `Email`.
   * @param {string} value - La dirección de correo electrónico proporcionada como argumento.
   * @throws {Error} Si la dirección de correo electrónico no es válida según el formato especificado.
   */
  constructor(value: string) {
    // Verifica si la dirección de correo electrónico es válida utilizando el método estático `isValidEmail`.
    if (!Email.isValidEmail(value)) {
      throw new Error('Correo electrónico no válido');
    }
    // Asigna el valor de la dirección de correo electrónico a la propiedad privada `value`.
    this.value = value;
  }

  /**
   * Método para obtener el valor de la dirección de correo electrónico.
   * @returns {string} - El valor de la dirección de correo electrónico.
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Método estático para verificar si una dirección de correo electrónico es válida.
   * @param {string} email - La dirección de correo electrónico a verificar.
   * @returns {boolean} - true si la dirección de correo electrónico es válida, false en caso contrario.
   */
  static isValidEmail(email: string): boolean {
    // Utiliza una expresión regular para verificar el formato del correo electrónico.
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
