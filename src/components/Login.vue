<template>
    <div class="container bg-white p-5 shadow my-5">
        <p class="text-center fs-1">Вход</p>
        <form :validation-schema="schema">
            <div class="mt-3">
                <label for="user_login" class="form-label">Логин</label>
                <input name="user_login" type="text" class="form-control" v-model="user.user_login" />
                <label name="user_login" class="error-feedback" />
            </div>
            <div class="mt-3">
                <label for="user_password" class="form-label">Пароль</label>
                <input name="user_password" type="password" class="form-control" v-model="user.user_password" />
                <label name="user_password" class="error-feedback" />
            </div>

            <div class="mt-3">
                <button class="btn btn-primary btn-block" :disabled="loading" @click="handleLogin" >
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Войти</span>
                </button>
            </div>

            <div class="mt-3">
                <div v-if="message" role="alert" class="alert alert-danger">
                    {{ message }}
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import * as yup from 'yup';

export default {
    name: 'Login-comp',
    data(){
        const schema = yup.object().shape({
            username: yup.string().required("Username is required!"),
            password: yup.string().required("Password is required!"),
        });
        return{
            loading: false,
            message: "",
            schema,
            user: {
                user_login: "",
                user_password: ""
            }
        };
    },
    computed:{
        loggedIn(){
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created(){
        if(this.loggedIn){
            this.$router.push('/profile');
        }
    },
    methods:{
        handleLogin() {
            this.loading = true;

            this.$store.dispatch("auth/login", this.user)
            .then((data) => {
                if (data != null && data != undefined)
                    this.$router.push('/profile');
                else
                    this.message = "Пользователя не существует";
            },
            error => {
                this.loading = false;
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
        }
    }
}
</script>