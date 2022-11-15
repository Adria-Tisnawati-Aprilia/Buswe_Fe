<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <div class="flex justify-between mx-auto mb-1 max-w-7xl">
                <div>
                    <router-link :to="{ name: 'Home' }" class="inline-block px-4 py-2 text-sm text-gray-500 bg-gray-100 border border-gray-200 shadow-sm rounded-t-md">Home</router-link>
                    <router-link :to="{ name: 'rute.add' }" class="inline-block px-4 py-2 text-sm text-blue-500 bg-blue-100 border border-blue-200 shadow-sm rounded-t-md">Buat baru</router-link>
                </div>
                <div
                v-if="typeof rutes.data != 'undefined'"
                >
                <div class="flex items-center justify-center mx-auto space-x-1">
                    <button
                    :disabled="rutes.prev_page_url == null"
                    :class="{
                        'cursor-not-allowed': rutes.prev_page_url == null,
                        'hover:bg-blue-400 hover:text-white': rutes.prev_page_url != null
                    }"
                    @click="page -= 1" class="flex items-center px-4 py-1 text-gray-500 bg-gray-100 border-t border-b border-l border-gray-200 rounded-l-md">
                    &#10094;
                </button>
                <button
                :disabled="rutes.next_page_url == null"
                :class="{
                    'cursor-not-allowed': rutes.next_page_url == null,
                    'hover:bg-blue-400 hover:text-white': rutes.next_page_url != null
                }"
                @click="page += 1" class="px-4 py-1 text-gray-500 bg-gray-100 border-t border-b border-r border-gray-200 rounded-r-md">
                &#10095;
            </button>
        </div>
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
                                    Kode
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Asal
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Tujuan
                                </th>
                                <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Waktu tempuh
                                </th>
                                <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                            <tr v-if="show_search">
                                <th colspan="6">
                                    <div class="flex">
                                        <div class="flex-1">
                                            <input v-model="search" type="text" class="block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cari berdasarkan kode..." />
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
                            <tr v-if="!rutes.data.length > 0">
                                <td class="px-6 py-4 whitespace-nowrap" colspan="6">
                                    <div class="text-sm text-gray-900">Data tidak ditemukan...</div>
                                </td>
                            </tr>
                            <tr :v-for="(rute, index) in rutes.data">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ rutes.from + index }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ rute.kode }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        [{{ rute.asal_kode}}] {{ rute.asal_nama }}<br />
                                        {{ rute.asal }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        [{{ rute.tujuan_kode }}] {{ rute.tujuan_nama }}<br />
                                        {{ rute.tujuan }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ convertToJamAndMinute(rute.waktu_tempuh) }}</div>
                                </td>
                                <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                    <router-link :to="{name: 'rute.edit', params:{id: rute.id} }" class="px-4 py-1 mr-1 text-xs text-gray-700 bg-gray-200 rounded-md shadow-sm hover:text-indigo-900">Edit</router-link>
                                    <router-link :to="{name: 'rute.show', params:{id: rute.id} }" class="px-4 py-1 mr-1 text-xs text-gray-700 bg-gray-200 rounded-md shadow-sm hover:text-indigo-900">Show</router-link>
                                    <button @click="_deleteDataRute(rute.id)" class="px-4 py-1 text-xs text-gray-700 bg-gray-200 rounded-md shadow-sm hover:text-indigo-900">Hapus</button>
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
        ...mapState('rute', ['rutes']),
        page: {
            get() {
                return this.$store.state.rute.page
            },
            set(val) {
                this.$store.commit('rute/_set_page', val)
            }
        }
    },
    methods: {
        ...mapActions('rute', ['fetchDataRutes', 'deleteDataRute']),
        async _fetchDataRutes() {
            try {
                await this.fetchDataRutes(this.search)
            } catch (e) {
                alert(e)
            }
        },
        async _deleteDataRute(ruteId) {
            try {
                if (!confirm('Apakah anda yakin ingin menghapus data ini?')) {
                    return false
                }
                await this.deleteDataRute(ruteId)
                this._fetchDataRutes()
            } catch (e) {
                alert(e)
            }
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
        this._fetchDataRutes()
    },
    watch: {
        page() {
            this._fetchDataRutes()
        },
        search: _.debounce(function(v) {
            this._fetchDataRutes()
        }, 500)
    }
}
</script>