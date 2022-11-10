<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <form class="max-w-sm mx-auto" @submit.prevent="_storeNewDataSupir">
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Nomor Registrasi</label>
                    <input v-model="supir.no_reg" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nomor registrasi supir">
                </div>
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Nama</label>
                    <input v-model="supir.nama_lengkap" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nama lengkap supir">
                </div>
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Alamat</label>
                    <input v-model="supir.alamat" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Alamat supir">
                </div>
                <div class="mb-2">
                    <label for="country" class="block text-sm font-medium text-gray-700">JK</label>
                    <select v-model="supir.jk" class="block w-full px-3 py-2 mt-1 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>
                <div class="flex mt-4 space-x-2">
                    <router-link :to="{ name: 'supir.index' }" class="block w-full py-2 text-center text-gray-800 border border-gray-800 rounded-md">Cancel</router-link>
                    <button type="submit" class="block w-full py-2 text-white bg-gray-800 rounded-md">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            supir: {
                no_reg: '',
                nama_lengkap: '',
                alamat: '',
                jk: 'L'
            }
        }
    },
    methods: {
        ...mapActions('supir', ['storeNewDataSupir']),
        _clearnForm() {
            this.supir = {
                no_reg: '',
                nama_lengkap: '',
                alamat: '',
                jk: 'L'
            }
        },
        _validateData() {
            if (this.supir.no_reg != '' &&
            this.supir.nama_lengkap != '' &&
            this.supir.alamat != '' &&
            this.supir.jk != '') {
                return true
            }
            return false
        },
        async _storeNewDataSupir() {
            try {
                if(!this._validateData()) {
                    return false
                }
                await this.storeNewDataSupir(this.supir)
                this._clearnForm()
                this.$router.replace({ name: 'supir.index' })
            } catch (e) {
                alert(e)
            }
        }
    }
}
</script>