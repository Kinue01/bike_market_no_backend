import Users from '@/data/users';

class AuthService {
    login(user) {
        for (let i = 0; i < Users.length; i++) {
            if (Users[i].user_login === user.user_login && Users[i].user_password === user.user_password) {
                localStorage.setItem('user', JSON.stringify(Users[i]));
                return Promise.resolve(user);
            }
        }
        return Promise.reject();
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user){
        Users.push(user);
        return Promise.resolve(user);
    }
}

export default new AuthService();