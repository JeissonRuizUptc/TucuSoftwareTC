import { Address } from './Address';
import { PhoneNumber } from './PhoneNumber';

export class Store {
  private id_store: number;
  private name: string;
  private address: Address;
  private telephone_number: PhoneNumber;

  /**
   * Constructor de la clase Store.
   * @param id_store Número de identificación de la tienda.
   * @param name Nombre de la tienda.
   * @param street Nombre de la calle de la dirección.
   * @param number Número de la dirección.
   * @param city Ciudad de la dirección.
   * @param province Provincia de la dirección.
   * @param country País de la dirección.
   * @param postal_code (Opcional) Código postal de la dirección.
   * @param details (Opcional) Detalles adicionales de la dirección.
   * @param telephone_number Número de teléfono de la tienda (instancia de PhoneNumber).
   */
  constructor(
    id_store: number,
    name: string,
    street: string,
    number: number,
    city: string,
    province: string,
    country: string,
    prefix: string,
    numberPhone: string,
    postal_code?: number,
    details?: string
    ) {
    this.id_store = id_store;
    this.name = name;
    this.address = new Address(
      street,
      number,
      city,
      province,
      country,
      postal_code,
      details
    );
    this.telephone_number = new PhoneNumber(prefix, numberPhone);
  }

  /**
   * Obtiene el número de identificación de la tienda.
   * @returns El número de identificación de la tienda.
   */
  getId_store(): number {
    return this.id_store;
  }

  /**
   * Obtiene el nombre de la tienda.
   * @returns El nombre de la tienda.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Obtiene el objeto de dirección de la tienda.
   * @returns El objeto de dirección.
   */
  getAddress(): Address {
    return this.address;
  }

  /**
   * Obtiene el número de teléfono de la tienda.
   * @returns El número de teléfono (instancia de PhoneNumber).
   */
  getTelephone_number(): PhoneNumber {
    return this.telephone_number;
  }
}
