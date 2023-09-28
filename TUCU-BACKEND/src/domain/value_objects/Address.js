/**
 * Clase Address para representar direcciones.
 */
class Address {
    constructor(street, number, city, province, country, postal_code, details) {
      this.street = street;
      this.number = number;
      this.city = city;
      this.province = province;
      this.country = country;
      this.postal_code = postal_code || null; // Valor opcional
      this.details = details || null; // Valor opcional
    }
  
    /**
     * Obtiene el nombre de la calle.
     * @returns {String} - El nombre de la calle.
     */
    getStreet() {
      return this.street;
    }
  
    /**
     * Obtiene el número de la dirección.
     * @returns {Number} - El número de la dirección.
     */
    getNumber() {
      return this.number;
    }
  
    /**
     * Obtiene el nombre de la ciudad.
     * @returns {String} - El nombre de la ciudad.
     */
    getCity() {
      return this.city;
    }
  
    /**
     * Obtiene el nombre de la provincia o estado.
     * @returns {String} - El nombre de la provincia o estado.
     */
    getProvince() {
      return this.province;
    }
  
    /**
     * Obtiene el código postal (si está disponible).
     * @returns {Number|null} - El código postal o null si no está disponible.
     */
    getPostalCode() {
      return this.postal_code;
    }
  
    /**
     * Obtiene el nombre del país.
     * @returns {String} - El nombre del país.
     */
    getCountry() {
      return this.country;
    }
  
    /**
     * Obtiene detalles adicionales de la dirección (si están disponibles).
     * @returns {String|null} - Detalles adicionales o null si no están disponibles.
     */
    getDetails() {
      return this.details;
    }
  
    /**
     * Verifica si una dirección es válida.
     * @param {Address} address - La dirección a verificar.
     * @returns {boolean} - true si la dirección es válida, false en caso contrario.
     */
    static isValid(address) {
      // Verificar que los campos obligatorios estén presentes y sean no nulos o vacíos
      if (
        !address.street ||
        !address.number ||
        !address.city ||
        !address.province ||
        !address.country
      ) {
        return false;
      }
  
      // Puedes agregar más lógica de validación
  
      return true;
    }
  }
  
  module.exports = Address;
  