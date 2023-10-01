import { User } from "../domian/User";
import { IUserRepository } from "../domian/interfaces/user.interface";
//Clase que usa la interface del dominio y tiene los casos de uso
//Esta clase representa un servicio en la capa de aplicación.
export class UserService{
    private userRepository: IUserRepository;
      // Constructor de la clase: Recibe un repositorio de usuarios como parámetro e inicializa la propiedad userRepository.
    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }
    // Agrega un nuevo usuario a través del repositorio
    // Retorna una promesa que eventualmente resuelve en un objeto User que representa al usuario agregado.
    public async addUser(
        id_user: number,
        email: string,
        username: string,
        password: string,
        firstName: string,
        surName: string,
        id_store: number,
        id_roles: number): Promise<User> {
            const user: User = new User(id_user, email,
                username,password,
                firstName, surName,
                id_store, id_roles);
            // Espera a que la promesa se resuelva y devuelve el usuario agregado.
            return await this.userRepository.addUser(user);
        }
}