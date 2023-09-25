/**
 * Clase PhoneNumber para representar números de teléfono.
 */
class PhoneNumber {
    constructor(value) {
      if (!PhoneNumber.isValid(value)) {
        throw new Error('Número de teléfono no válido.');
      }
      this.value = value;
    }
  
    /**
     * Obtiene el valor del número de teléfono.
     * @returns {String} - El valor del número de teléfono.
     */
    getValue() {
      return this.value;
    }
  
    /**
     * Verifica si un número de teléfono es válido para países latinoamericanos.
     * @param {String} phoneNumber - El número de teléfono a verificar.
     * @returns {boolean} - true si el número es válido, false en caso contrario.
     */
    static isValid(phoneNumber) {
      // Reglas de validación para números de teléfono en países latinoamericanos:
      // - Colombia: +57 seguido de 10 dígitos.
      // - Venezuela: +58 seguido de 10 dígitos.
      // - Perú: +51 seguido de 9 dígitos.
      // - Ecuador: +593 seguido de 9 dígitos.
      const regexColombia = /^\+57\d{10}$/;
      const regexVenezuela = /^\+58\d{10}$/;
      const regexPeru = /^\+51\d{9}$/;
      const regexEcuador = /^\+593\d{9}$/;
  
      return (
        regexColombia.test(phoneNumber) ||
        regexVenezuela.test(phoneNumber) ||
        regexPeru.test(phoneNumber) ||
        regexEcuador.test(phoneNumber)
      );
    }
  }
  
  module.exports = PhoneNumber;
  