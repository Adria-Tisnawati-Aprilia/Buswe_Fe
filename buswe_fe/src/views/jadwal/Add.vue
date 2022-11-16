<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <form @submit.prevent="_storeDataJadwal" class="max-w-sm mx-auto">
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Tanggal</label>
                    <input v-model="jadwal.berangkat_date" type="date" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Kode">
                </div>
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Jam</label>
                    <input v-model="jadwal.berangkat_time" type="time" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Kode">
                </div>
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Bus</label>
                    <select class="block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    v-model="jadwal.bus_id"
                    >
                    <option :v-for="bus in buses.data"
                    :value="bus.id"
                    >
                    {{bus.bus_number }} - {{ bus.distributor}}</option>
                </select>
            </div>
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700">Supir</label>
                <select class="block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                v-model="jadwal.supir_id"
                >
                <option :v-for="supir in supirs.data"
                :value="supir.id"
                >
                {{supir.no_reg }} - {{ supir.nama_lengkap}}</option>
            </select>
        </div>
        <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700">Rute</label>
            <select class="block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            v-model="jadwal.rute_id"
            >
            <option :v-for="rute in rutes.data"
            :value="rute.id"
            >
            {{rute.kode }} - Waktu tempuh {{ rute.waktu_tempuh}} menit</option>
        </select>
    </div>
    <div class="flex mt-2 space-x-1">
        <router-link :to="{ name: 'jadwal.index' }" class="block w-full py-2 text-center text-gray-800 border-2 border-gray-800 rounded-md">Cancel</router-link>
        <button type="submit" class="block w-full py-2 text-white bg-gray-800 rounded-md">Simpan</button>
    </div>
</form>
</div>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            jadwal: {}
        }
    },
    computed: {
        ...mapState('bus', ['buses']),
        ...mapState('supir', ['supirs']),
        ...mapState('rute', ['rutes'])
    },
    methods: {
        ...mapActions('bus', ['fetchDataBuses']),
        ...mapActions('supir', ['fetchDataSupirs']),
        ...mapActions('rute', ['fetchDataRutes']),
        ...mapActions('jadwal', ['storeDataJadwal']),
        async _fetchDataBuses(prev, next) {
            try {
                await this.fetchDataBuses("")
            } catch (e) {
                alert(e)
            }
        },
        async _fetchDataSupirs(prev, next) {
            try {
                await this.fetchDataSupirs("")
            } catch (e) {
                alert(e)
            }
        },
        async _fetchDataRutes(prev, next) {
            try {
                await this.fetchDataRutes("")
            } catch (e) {
                alert(e)
            }
        },
        async _storeDataJadwal() {
            try {
                this.jadwal.berangkat = this.jadwal.berangkat_date + " " + this.jadwal.berangkat_time
                await this.storeDataJadwal(this.jadwal)
                this.$router.replace({ name: 'jadwal.index'})
            } catch (e) {
                alert(e)
            }
        }
    },
    created() {
        this._fetchDataBuses(null, null)
        this._fetchDataSupirs(null, null)
        this._fetchDataRutes(null, null)
    }
}
</script>