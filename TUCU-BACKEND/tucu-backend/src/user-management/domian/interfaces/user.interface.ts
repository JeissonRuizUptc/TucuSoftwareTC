import { User } from "../User";

export interface IUserRepository{
    // Método addUser: agrega un usuario al repositorio.
  // - Parámetro 'user': un objeto User que representa al usuario a agregar.
  // - Retorna una promesa que eventualmente resuelve en un objeto User, que representa al usuario agregado.
  addUser(user: User): Promise<User>;

  // Método findById: busca un usuario por su identificador único (id) en el repositorio.
  // - Parámetro 'id': un número que representa el identificador único del usuario a buscar.
  // - Retorna una promesa que eventualmente resuelve en un objeto User si se encuentra el usuario, o null si no se encuentra.
  findById(id: number): Promise<User | null>;

  // Método findByUsername: busca un usuario por su nombre de usuario en el repositorio.
  // - Parámetro 'username': una cadena que representa el nombre de usuario del usuario a buscar.
  // - Retorna una promesa que eventualmente resuelve en un objeto User si se encuentra el usuario, o null si no se encuentra.
  findByUsername(username: string): Promise<User | null>;

  // Método updateUser: actualiza la información de un usuario existente en el repositorio.
  // - Parámetro 'user': un objeto User que representa al usuario con la información actualizada.
  // - Retorna una promesa que eventualmente resuelve en un objeto User si se actualiza con éxito, o null si el usuario no se encuentra en el repositorio.
  updateUser(user: User): Promise<User | null>;

  // Método disableUser: deshabilita (o elimina) un usuario por su identificador único (id) en el repositorio.
  // - Parámetro 'id': un número que representa el identificador único del usuario a deshabilitar (eliminar).
  // - Retorna una promesa que eventualmente resuelve en true si se realiza con éxito la operación de deshabilitación (eliminación), o false si el usuario no se encuentra en el repositorio.
  disableUser(id: number): Promise<boolean>;
}