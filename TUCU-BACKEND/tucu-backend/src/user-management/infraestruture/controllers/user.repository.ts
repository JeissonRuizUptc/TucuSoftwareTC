import { User } from "../../domian/User";
import { IUserRepository } from "../../domian/interfaces/user.interface";

class UserRepositoryPrisma implements IUserRepository{

    public async addUser(user: User): Promise<User> {
        return await prisma.user.create({
            data: {
                
            }
        })
    }
}