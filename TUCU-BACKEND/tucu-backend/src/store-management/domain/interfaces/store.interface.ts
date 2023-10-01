import { Store } from "../Store";

/**
 * Interface StoreRepository
 */
export interface IStoreRepository {
  // Método addStore: agrega una tienda al repositorio.
  // - Parámetro 'store': un objeto Store que representa la tienda a agregar.
  // - Retorna una promesa que eventualmente resuelve en un objeto Store, que representa la tienda agregada.
  addStore(store: Store): Promise<Store>;

  // Método findAll: busca y retorna todas las tiendas en el repositorio.
  // - Retorna una promesa que eventualmente resuelve en un array de objetos Store que representan todas las tiendas encontradas.
  findAll(): Promise<Store[]>;

  // Método findById: busca una tienda por su identificador único (id) en el repositorio.
  // - Parámetro 'id': un número que representa el identificador único de la tienda a buscar.
  // - Retorna una promesa que eventualmente resuelve en un objeto Store si se encuentra la tienda, o null si no se encuentra.
  findById(id: number): Promise<Store | null>;

  // Método disableStore: deshabilita (o elimina) una tienda por su identificador único (id) en el repositorio.
  // - Parámetro 'id': un número que representa el identificador único de la tienda a deshabilitar (eliminar).
  // - Retorna una promesa que eventualmente resuelve en true si se realiza con éxito la operación de deshabilitación (eliminación), o false si la tienda no se encuentra en el repositorio.
  disableStore(id: number): Promise<boolean>;
}
