<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <form class="max-w-sm mx-auto" @submit.prevent="_storeNewDataBus">
                <div class="mb-2">
                    <label for="price" class="block text-sm font-medium text-gray-700">Plat Nomor</label>
                    <input v-model="bus.plat_number" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nomor Plat Bus">
                </div>
                <div class="mb-2">
                    <label for="price" class="block text-sm font-medium text-gray-700">Bus Nomor</label>
                    <input v-model="bus.bus_number" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nomor Bus">
                </div>
                <div class="mb-2">
                    <label for="price" class="block text-sm font-medium text-gray-700">Distributor</label>
                    <input v-model="bus.distributor" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Distributor">
                </div>
                <div class="mb-2">
                    <label for="price" class="block text-sm font-medium text-gray-700">Jumlah Kursi</label>
                    <input v-model="bus.ukuran" type="number" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Jumlah kursi">
                </div>
                <div class="flex mt-2 space-x-2">
                    <router-link :to="{ name: 'bus.index'}" class="block w-full py-2 text-center text-gray-800 border border-gray-800 rounded-md">Cancel</router-link>
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
            bus: {
                plat_number: '',
                bus_number: '',
                distributor: '',
                ukuran: 0
            }
        }
    },
    methods: {
        ...mapActions('bus', ['storeNewDataBus']),
        _resetForm() {
            this.bus = {
                plat_number: '',
                bus_number: '',
                distributor: '',
                ukuran: 0
            }
        },
        _validateForm() {
            if(this.bus.plat_number != ''
            && this.bus.bus_number != ''
            && this.bus.distributor != ''
            && this.bus.ukuran != 0) {
                return true;
            }
            return false;
        },
        async _storeNewDataBus() {
            try {
                if (!this._validateForm()) {
                    return false;
                }
                await this.storeNewDataBus(this.bus)
                this._resetForm()
                this.$router.replace({ name: 'bus.index'})
            } catch (e) {
                alert(e)
            }
        }
    }
}
</script>