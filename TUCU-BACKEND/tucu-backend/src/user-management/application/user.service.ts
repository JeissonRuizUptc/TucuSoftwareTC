import { User } from "../domain/User";
import { IUserRepository } from "../domain/interfaces/user.interface";
import jwt from 'jsonwebtoken'; // Importa la biblioteca jwt

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
        ): Promise<User> {

            //store
            const user: User = new User(id_user, email,
                username,password,
                firstName, surName,
                id_store, 1);
            // Espera a que la promesa se resuelva y devuelve el usuario agregado.
            return await this.userRepository.addUser(user);
        }
    
    // Método login: Inicia sesión de un usuario utilizando su nombre de usuario y contraseña.
    // - Parámetro 'username': una cadena que representa el nombre de usuario del usuario que intenta iniciar sesión.
    // - Parámetro 'password': una cadena que representa la contraseña del usuario que intenta iniciar sesión.
    // - Retorna una promesa que eventualmente resuelve en un objeto User si la autenticación es exitosa, o null si no es exitosa.
    public async login(username: string, password: string): Promise<User | null> {
    // Utiliza el método findByCredentials del repositorio para buscar al usuario por sus credenciales.
        const user = await this.userRepository.findByCredentials(username, password);
    
        // Verifica si se encontró un usuario con las credenciales proporcionadas.
        if (user !== null) {
        // Autenticación exitosa; acción adicional para generar un token de autenticación.
            const token = jwt.sign({ userId: user.getId() }, 'secreto', { expiresIn: '1h' });
        }
        return user; // Retorna el usuario encontrado o null si la autenticación falló.
    }
    
}