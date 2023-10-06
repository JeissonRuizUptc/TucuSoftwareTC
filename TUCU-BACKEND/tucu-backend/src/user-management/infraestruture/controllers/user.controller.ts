import { Body, Controller, Post, Route } from "tsoa";
import { UserService } from "../../application/user.service";
import { UserRepositoryPrisma } from "../user.repository.prisma";
import { User } from "../../domain/User";

@Route('user')
export class UserCotroller extends Controller{

    private readonly userService : UserService;

    constructor() {
        super();
        var userRepositoryPrima = new UserRepositoryPrisma();
        this.userService = new UserService(userRepositoryPrima)
      }

   @Post() 
    public async addUser(
        @Body() requestBody: {id_user: number,
            email: string,
            username: string,
            password: string,
            firstName: string,
            surName: string,
            id_store: number,
            id_roles: number} ): Promise<User> {
        const {id_user,
            email,
            username,
            password,
            firstName,
            surName,
            id_store} = requestBody;
        return await this.userService.addUser(id_user,
            email,
            username,
            password,
            firstName,
            surName,
            id_store);
    }

}