<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <div class="flex justify-between mx-auto mb-1 max-w-7xl">
                <div>
                    <router-link :to="{ name: 'Home' }" class="inline-block px-4 py-2 text-sm text-gray-500 bg-gray-100 border border-gray-200 shadow-sm rounded-t-md">Home</router-link>
                    <router-link :to="{ name: 'supir.add' }" class="inline-block px-4 py-2 text-sm text-blue-500 bg-blue-100 border border-blue-200 shadow-sm rounded-t-md">Tambah baru</router-link>
                </div>
                <div
                v-if="typeof supirs.data != 'undefined'"
                >
                <div class="flex items-center justify-center mx-auto space-x-1">
                    <button
                    :disabled="supirs.prev_page_url == null"
                    :class="{
                        'cursor-not-allowed': supirs.prev_page_url == null,
                        'hover:bg-blue-400 hover:text-white': supirs.prev_page_url != null
                    }"
                    @click="page -= 1" class="flex items-center px-4 py-1 text-gray-500 bg-gray-100 border-t border-b border-l border-gray-200 rounded-l-md">
                    &#10094;
                    </button>
                    <button
                    :disabled="supirs.next_page_url == null"
                    :class="{
                        'cursor-not-allowed': supirs.next_page_url == null,
                        'hover:bg-blue-400 hover:text-white': supirs.next_page_url != null
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
                                        Nomor Registrasi
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Nama
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Alamat
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        JK
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                                <tr v-if="show_search">
                                    <th colspan="6">
                                        <div class="flex">
                                            <div class="flex-1">
                                                <input v-model="search" type="text" class="block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cari berdasarkan nama | no registrasi..." />
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
                                <tr v-if="!supirs.data.length > 0">
                                    <td class="px-6 py-4 whitespace-nowrap" colspan="6">
                                        <div class="text-sm text-gray-900">Data tidak ditemukan...</div>
                                    </td>
                                </tr>
                                <tr :v-for="(supir, index) in supirs.data">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ supirs.from+index }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ supir.no_reg }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ supir.nama_lengkap }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ supir.alamat }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ _translateGender(supir.jk) }}</div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                        <router-link :to="{name: 'supir.edit', params:{id: supir.id}}" class="px-4 py-1 mr-1 text-xs text-gray-700 bg-gray-200 rounded-md shadow-sm hover:text-indigo-900">Edit</router-link>
                                        <button @click="_deleteDataSupir(supir.id)" class="px-4 py-1 text-xs text-gray-700 bg-gray-200 rounded-md shadow-sm hover:text-indigo-900">Hapus</button>
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
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';
export default {
    data: () => ({
        show_search: false,
        search: ""
    }),
    computed: {
        ...mapState('supir', ['supirs']),
        page: {
            get() {
                return this.$store.state.supir.page
            },
            set(val) {
                this.$store.commit('supir/_set_page', val)
            }
        }
    },
    methods: {
        ...mapActions('supir', ['fetchDataSupirs', 'deleteDataSupir']),
        async _fetchDataSupirs() {
            try {
                await this.fetchDataSupirs(this.search)
            } catch (e) {
                alert(e)
            }
        },
        _translateGender(gender) {
            if (gender == 'L') {
                return 'Laki-laki';
            } else if (gender == 'P') {
                return 'Perempuan';
            } else {
                return 'Unknown';
            }
        },
        async _deleteDataSupir(supirId) {
            try {
                if (!confirm('Apakah anda yakin untuk menghapus supir ini?')) {
                    return false
                }
                await this.deleteDataSupir(supirId)
                this._fetchDataSupirs()
            } catch (e) {
                alert(e)
            }
        }
    },
    created() {
        this._fetchDataSupirs()
    },
    watch: {
        page() {
            this._fetchDataSupirs()
        },
        search: _.debounce(function(v) {
            this._fetchDataSupirs()
        }, 500)
    }
}


