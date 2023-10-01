/**
 * Clase `Password` para representar contraseñas y verificar su cumplimiento con los requisitos de seguridad.
 */
export class Password {

  // Propiedad privada para almacenar el valor de la contraseña.
  private value: string;

  /**
   * Constructor de la clase `Password`.
   * @param {string} value - La contraseña proporcionada como argumento.
   * @throws {Error} Si la contraseña no cumple con los requisitos de seguridad.
   */
  constructor(value: string) {
    // Verifica si la contraseña cumple con los requisitos de seguridad utilizando el método estático `isValid`.
    if (!Password.isValid(value)) {
      throw new Error('La contraseña no cumple con los requisitos de seguridad.');
    }
    // Asigna el valor de la contraseña a la propiedad privada `value`.
    this.value = value;
  }

  /**
   * Método para obtener el valor de la contraseña.
   * @returns {string} - El valor de la contraseña.
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Método estático para verificar si una contraseña cumple con los requisitos de seguridad.
   * @param {string} password - La contraseña a verificar.
   * @returns {boolean} - true si la contraseña cumple con los requisitos, false en caso contrario.
   */
  static isValid(password: string): boolean {
    // Utiliza una expresión regular para verificar los requisitos de la contraseña:
    // - Mínimo 8 caracteres.
    // - Al menos una letra (mayúscula o minúscula).
    // - Al menos un número.
    // - Al menos un carácter especial.
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
}
