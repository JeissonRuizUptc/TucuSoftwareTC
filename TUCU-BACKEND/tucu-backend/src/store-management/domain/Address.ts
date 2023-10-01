/**
 * Clase que represnta una direccion o ubicacion, como value object
 */
export class Address {
    private street: string;
    private number: number;
    private city: string;
    private province: string;
    private postal_code?: number;
    private country: string;
    private details?: string;
  
    constructor(
      street: string,
      number: number,
      city: string,
      province: string,
      country: string,
      postal_code?: number,
      details?: string
    ) {
      // Los campos obligatorios se verifican en el constructor
      if (!street || !city || !province || !country) {
        throw new Error('Los campos street, city, province y country son obligatorios.');
      }
  
      this.street = street;
      this.number = number;
      this.city = city;
      this.province = province;
      this.country = country;
      this.postal_code = postal_code;
      this.details = details;
    }
  
    getStreet(): string {
      return this.street;
    }
  
    getNumber(): number {
      return this.number;
    }
  
    getCity(): string {
      return this.city;
    }
  
    getProvince(): string {
      return this.province;
    }
  
    getPostalCode(): number | undefined {
      return this.postal_code;
    }
  
    getCountry(): string {
      return this.country;
    }
  
    getDetails(): string | undefined {
      return this.details;
    }
  
    isValid(address: Address): boolean {
      // Implementación de la lógica para validar una dirección
      // En este caso, simplemente verificamos que los campos obligatorios estén presentes
      // Si los campos requeridos están presentes, consideramos la dirección válida
      return !!address.street && !!address.city && !!address.province && !!address.country;
    }
  }
  