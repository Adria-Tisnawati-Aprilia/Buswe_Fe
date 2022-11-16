<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <div class="flex justify-between mx-auto max-w-7xl">
                <div>
                    <router-link :to="{ name: 'Home' }" class="inline-block px-4 py-2 text-sm text-gray-500 bg-gray-100 border border-gray-200 shadow-sm rounded-t-md">Home</router-link>
                    <router-link :to="{ name: 'jadwal.add'}" class="inline-block px-4 py-2 text-sm text-blue-500 bg-blue-100 border border-blue-200 shadow-sm rounded-t-md">Buat baru</router-link>
                </div>
            </div>
            <div class="mx-auto max-w-7xl">
                <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr v-if="!show_search">
                                            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                <button @click="show_search=true">&#10061; Cari...</button>
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                Bus
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                Supir
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                Rute
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                Berangkat
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th scope="col" class="relative px-6 py-3">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        <tr v-if="show_search">
                                            <th colspan="7">
                                                <div class="flex">
                                                    <div class="flex-1">
                                                        <input v-model="search" type="date" class="block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cari berdasarkan plat number | bus number | distributor..." />
                                                    </div>
                                                    <div class="flex items-center justify-center">
                                                        <button @click="show_search=false" class="flex items-center justify-center w-5 h-5 text-white bg-gray-400 rounded-full">
                                                            <p>&#10005;</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-if="!jadwals.data.length > 0">
                                            <td class="px-6 py-4 whitespace-nowrap" colspan="6">
                                                <div class="text-sm text-gray-900">Data tidak ditemukan...</div>
                                            </td>
                                        </tr>
                                        <tr :v-for="(jadwal, index) in jadwals.data" 
                                        :class="getBackgroundRow(jadwal.status)">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ jadwals.from + index }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ jadwal.bus_number }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">
                                                [{{ jadwal.supir_no_reg }}] {{ jadwal.supir_nama_lengkap}}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">
                                                [{{ jadwal.rute_kode }}] <br /> {{ convertToJamAndMinute(jadwal.rute_waktu_tempuh) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">
                                                {{ jadwal.berangkat }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">
                                                {{ jadwal.status }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                            <router-link :to="{ name: 'jadwal.edit', params: {id: jadwal.id} }" class="px-4 py-1 mr-1 text-xs text-gray-700 bg-gray-200 rounded-md shadow-sm hover:text-indigo-900">Edit</router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
    data: () => ({
        show_search: false,
        search: ""
    }),
    computed: {
        ...mapState('jadwal', ['jadwals']),
        page: {
            get() {
                return this.$store.state.jadwal.page
            },
            set(val) {
                this.$store.commit('jadwal/_set_page', val)
            }
        }
    },
    methods: {
        ...mapActions('jadwal', ['fetchDataJadwals']),
        async _fetchDataJadwals(prev, next) {
            try {
                await this.fetchDataJadwals(this.search)
            } catch (e) {
                alert(e)
            }
        },
        getBackgroundRow(status) {
            if(status == 'CANCEL') {
                return 'bg-red-100';
            } else if(status == 'AAD') {
                return 'bg-green-100';
            }
            return '';
        },
        convertToJamAndMinute(waktu) {
            let jam = Math.floor(waktu/60);
            let menit = waktu-(jam*60);
            if(jam > 0) {
                return `${jam} jam ${menit} menit`
            }
            return `${menit} menit`
        }
    },
    created() {
        this._fetchDataJadwals()
    },
    watch: {
        page() {
            this._fetchDataJadwals()
        },
        search: _.debounce(function() {
            this._fetchDataJadwals()
        }, 500)
    }
}
</script>