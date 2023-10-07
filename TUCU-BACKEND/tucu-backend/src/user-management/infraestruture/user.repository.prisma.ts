import prisma from "../../../prisma";
import { User } from "../domain/User";
import { IUserRepository } from "../domain/interfaces/user.interface";

export class UserRepositoryPrisma implements IUserRepository{
    
    public async addUser(user: User): Promise<User> {
        return await prisma.uSERS.create({
            data: { 
                idUSERS: user.getId(),
                username: user.getUsername(),                
                firstname: user.getFirstName(),
                password: user.getPassword().getValue(),
                surname: user.getSurname(),
                enabled: user.isUserEnable(),
                email: user.getEmail().getValue(), 
                timestamp: new Date(),
                id_stores_fk: user.getIdStores(),
                id_roles_fk: user.getIdRoles()
            }
        })
    }

    findByCredentials(username: string, password: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findByUsername(username: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    updateUser(user: User): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    disableUser(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}