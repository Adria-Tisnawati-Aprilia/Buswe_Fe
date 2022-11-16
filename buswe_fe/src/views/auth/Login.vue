<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <form class="max-w-sm mx-auto" @submit.prevent="_login">
                <div class="mb-2">
                    <label for="price" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="form.email" type="email" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email">
                </div>
                <div class="mb-2">
                    <label for="price" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password">
                </div>
                <div class="flex mt-2 space-x-2">
                    <button type="submit" class="block w-full py-2 text-white bg-blue-500 rounded-md">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data: () => ({
        form: {
            email: "",
            password: ""
        }
    }),
    
    computed: {
        ...mapGetters(['isAuth'])
    },
    
    methods: {
        ...mapActions('auth', ['login']),
        async _login() {
            try{
                await this.login(this.form)
                this.$router.replace({ name: 'Home' })
            } catch (e) {
                alert(e)
            }
        }
    },
    
    created() {
        if (this.isAuth) {
            this.$router.replace({ name: 'Home' })
        }
    }
}
</script>

<style>

</style>