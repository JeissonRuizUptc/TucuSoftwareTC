class Email {
    /**
     * Crea una instancia de la clase
     * @param {Email} value 
     * Email con la dirección de correo electrónico proporcionada como argumento. 
     * Si la dirección de correo electrónico no es válida según el formato especificado, 
     * se lanzará una excepción Error.
     */
    constructor(value) {
      if (!Email.isValidEmail(value)) {
        throw new Error('Correo electrónico no válido');
      }
      this.value = value;
    }
  
    getValue() {
      return this.value;
    }
  
    static isValidEmail(email) {
      // Utilizamos una expresión regular para verificar el formato del correo electrónico
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }
  }
  
  module.exports = Email;