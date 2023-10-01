/**
 * Clase que representa un value object para números telefónicos de países latinoamericanos.
 */
export class PhoneNumber {
  private prefix: string;
  private number: string;

  /**
   * Constructor de la clase PhoneNumber.
   * @param prefix El prefijo telefónico del país (por ejemplo, +57 para Colombia).
   * @param number El número de teléfono sin el prefijo.
   */
  constructor(prefix: string, number: string) {
    this.prefix = prefix;
    this.number = number;
  }

  /**
   * Obtiene el prefijo telefónico del país.
   * @returns El prefijo telefónico.
   */
  getPrefix(): string {
    return this.prefix;
  }

  /**
   * Obtiene el número de teléfono sin el prefijo.
   * @returns El número de teléfono.
   */
  getNumber(): string {
    return this.number;
  }

  /**
   * Valida si el número de teléfono es válido según el formato del país.
   * @returns true si el número es válido, false en caso contrario.
   */
  isValid(): boolean {
    // Combina el prefijo y el número para validar el número completo
    const phoneNumber = this.prefix + this.number;

    // Implementación de la lógica de validación para varios países

    // Remover espacios en blanco y guiones del número de teléfono
    const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/-/g, '');

    // Validación específica para Colombia (formato: +57 seguido de 10 dígitos)
    if (/^(\+57\d{10}|\d{10})$/.test(cleanedPhoneNumber)) {
      return true;
    }

    // Validación específica para Ecuador (formato: +593 seguido de 9 dígitos)
    if (/^(\+593\d{9}|\d{9})$/.test(cleanedPhoneNumber)) {
      return true;
    }

    // Validación específica para Venezuela (formato: +58 seguido de 10 dígitos)
    if (/^(\+58\d{10}|\d{10})$/.test(cleanedPhoneNumber)) {
      return true;
    }

    // Validación específica para Argentina (formato: +54 seguido de 10 dígitos)
    if (/^(\+54\d{10}|\d{10})$/.test(cleanedPhoneNumber)) {
      return true;
    }

    // Validación específica para México (formato: +52 seguido de 10 dígitos)
    if (/^(\+52\d{10}|\d{10})$/.test(cleanedPhoneNumber)) {
      return true;
    }

    // Si no coincide con ninguno de los formatos anteriores, se considera inválido
    return false;
  }
}
