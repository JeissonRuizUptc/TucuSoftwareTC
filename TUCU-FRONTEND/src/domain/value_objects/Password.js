/**
 * Clase Password para representar contraseñas.
 */
class Password {
    constructor(value) {
      if (!Password.isValid(value)) {
        throw new Error('La contraseña no cumple con los requisitos de seguridad.');
      }
      this.value = value;
    }
  
    /**
     * Obtiene el valor de la contraseña.
     * @returns {String} - El valor de la contraseña.
     */
    getValue() {
      return this.value;
    }
  
    /**
     * Verifica si una contraseña cumple con los requisitos de seguridad.
     * @param {String} password - La contraseña a verificar.
     * @returns {boolean} - true si la contraseña cumple con los requisitos, false en caso contrario.
     */
    static isValid(password) {
      // Requisitos de la contraseña:
      // - Mínimo 8 caracteres.
      // - Al menos una letra (mayúscula o minúscula).
      // - Al menos un número.
      // - Al menos un carácter especial.
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    }
  }
  
  module.exports = Password;