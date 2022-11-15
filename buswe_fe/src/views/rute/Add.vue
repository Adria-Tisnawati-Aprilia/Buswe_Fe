<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <form @submit.prevent="_storeNewRute" class="max-w-sm mx-auto">
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Kode</label>
                    <input v-model="rute.kode" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Kode">
                </div>
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700">Asal</label>
                    <select class="block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    v-model="rute.asal"
                    >
                    <option :v-for="terminal in terminals.data"
                    :value="terminal.id"
                    >
                    {{terminal.kode }} - {{ terminal.nama}}</option>
                </select>
            </div>
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700">Tujuan</label>
                <select class="block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                v-model="rute.tujuan"
                >
                <option :v-for="terminal in terminals.data"
                :value="terminal.id"
                >
                {{terminal.kode }} - {{ terminal.nama}}</option>
            </select>
        </div>
        <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700">Waktu tempuh</label>
            <input v-model.number="rute.waktu_tempuh" type="number" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Waktu tempuh dalam menit">
        </div>
        <div class="mb-2">
            <label for="country" class="block text-sm font-medium text-gray-700">Checkpoints</label>
            <div class="flex items-center" :v-for="(ruteIterate, i) in rute.checkpoints">
                <input v-model.number="rute.checkpoints[i].code" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Kode" />
                <select class="block w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                v-model="rute.checkpoints[i].id"
                >
                <option :v-for="terminal in terminals.data"
                :value="terminal.id"
                >
                {{terminal.kode }} - {{ terminal.nama}}</option>
            </select>
            <input v-model.number="rute.checkpoints[i].waktu" type="number" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Waktu menit">
        </div>
        
        
        <div class="flex justify-end mt-1">
            <button type="button" class="block px-4 py-1 mr-1 text-white bg-red-400 rounded-md" @click="_removeCheckpoints">Hapus</button>
            <button type="button" class="block px-4 py-1 text-white bg-blue-400 rounded-md" @click="_addCheckpoints">Tambah</button>
        </div>
    </div>
    <div class="flex mt-2 space-x-1">
        <router-link :to="{ name: 'rute.index' }" class="block w-full py-2 text-center text-gray-800 border-2 border-gray-800 rounded-md">Cancel</router-link>
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
            rute: {
                kode: "",
                asal: "",
                tujuan: "",
                waktu_tempuh: 30,
                checkpoints: [
                {id: "", code: "", waktu: 30 }
                ]
            }
        }
    },
    computed: {
        ...mapState('terminal', ['terminals'])
    },
    methods: {
        ...mapActions('terminal', ['fetchDataTerminals']),
        ...mapActions('rute', ['storeNewRute']),
        async _storeNewRute() {
            try {
                await this.storeNewRute(this.rute)
                this.$router.replace({ name: 'rute.index' })
            } catch (e) {
                alert(e)
            }
        },
        async _fetchDataTerminals(prev, next) {
            try {
                await this.fetchDataTerminals({
                    prev: prev,
                    next: next
                })
            } catch (e) {
                alert(e)
            }
        },
        _addCheckpoints() {
            this.rute.checkpoints.push({
                id: "", code: "", waktu: 30
            })
        },
        _removeCheckpoints() {
            this.rute.checkpoints.pop()
        }
    },
    created() {
        this._fetchDataTerminals(null, null)
    }
}
</script>