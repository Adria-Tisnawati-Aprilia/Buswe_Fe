<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <div class="max-w-3xl mx-auto rounded-md shadow-md ">
                <div class="flex items-center justify-between px-8 py-4 border-b-2 bg-gray-50">
                    <div>
                        <p class="text-lg font-semibold text-gray-600">[{{ rute.kode }}] {{ rute.asal_provinsi}} - {{ rute.tujuan_provinsi }}</p>
                        <p class="font-semibold text-gray-500">{{ convertToJamAndMinute(rute.waktu_tempuh) }}</p>
                    </div>
                    <div>
                        <router-link :to="{ name: 'rute.index' }" class="block px-3 py-1 font-semibold text-white bg-red-400 rounded-md">x</router-link>
                    </div>
                </div>
                <div class="px-8 py-12">
                    <div class="flex items-stretch mb-4 space-x-5">
                        <div class="w-32">
                            <div class="px-4 text-sm text-white bg-green-300 rounded-xl">{{ rute.asal_tipe }}</div>
                        </div>
                        <div>
                            <div class="w-4 h-4 border-2 border-blue-400 rounded-full"></div>
                            <div class="w-4 h-full bg-blue-300 rounded-full"></div>
                        </div>
                        <div class="h-24">
                            <p class="font-semibold text-gray-600">[{{ rute.asal_kode }}] {{rute.asal_nama}}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-stretch mb-4 space-x-5" :v-for="checkpoint in rute.checkpoints">
                        <div class="w-32">
                            <div class="px-4 text-sm text-white bg-green-300 rounded-xl">{{ checkpoint.terminal.tipe }}</div>
                        </div>
                        <div>
                            <div class="w-4 h-4 bg-yellow-300 rounded-full"></div>
                            <div class="w-4 h-full bg-blue-300 rounded-full"></div>
                        </div>
                        <div class="h-24">
                            <p class="font-semibold text-gray-600">[{{ checkpoint.terminal.kode }}] {{checkpoint.terminal.nama}}</p>
                            <p class="text-gray-600 font-sm">Berhenti {{ checkpoint.waktu }} menit</p>
                        </div>
                    </div>
                    
                    <div class="flex items-stretch space-x-5">
                        <div class="w-32">
                            <div class="px-4 text-sm text-white bg-green-300 rounded-xl">{{ rute.tujuan_tipe }}</div>
                        </div>
                        <div>
                            <div class="w-4 h-4 border-2 border-blue-400 rounded-full"></div>
                        </div>
                        <div class="h-24">
                            <p class="font-semibold text-gray-600">[{{ rute.tujuan_kode }}] {{rute.tujuan_nama}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            rute: {}
        }
    },
    computed: {
        
    },
    methods: {
        ...mapActions('rute', ['getDataRute']),
        async _getDataRute() {
            try {
                let rute = await this.getDataRute(this.$route.params.id)
                this.rute = rute
                console.log(this.rute)
            } catch (e) {
                alert(e)
            }
        },
        convertToJamAndMinute(waktu) {
            let jam = Math.floor(waktu/60);
            let minute = waktu-(jam*60);
            if(jam > 0) {
                return `${jam} jam ${minute} menit`
            }
            return `${minute} menit`
        }
    },
    created() {
        this._getDataRute()
    }
}
</script>
