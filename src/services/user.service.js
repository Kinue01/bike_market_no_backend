import Users from "@/data/users";

class UserService {
    getUsers() {
        return Promise.resolve(Users);
    }
}

export default new UserService();