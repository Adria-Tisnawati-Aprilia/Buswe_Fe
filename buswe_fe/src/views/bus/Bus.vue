<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <div class="flex justify-between mx-auto max-w-7xl">
                <div>
                    <router-link :to="{ name: 'Home' }" class="inline-block px-4 py-2 text-sm text-gray-500 bg-gray-100 border border-gray-200 shadow-sm rounded-t-md">Home</router-link>
                    <router-link :to="{ name: 'bus.add'}" class="inline-block px-4 py-2 text-sm text-blue-500 bg-blue-100 border border-blue-200 shadow-sm rounded-t-md">Buat baru</router-link>
                </div>
                <div
                v-if="typeof buses.data != 'undefined'"
                >
                <div class="flex items-center justify-center mx-auto space-x-1">
                    <button
                    :disabled="buses.prev_page_url == null"
                    :class="{
                        'cursor-not-allowed': buses.prev_page_url == null,
                        'hover:bg-blue-400 hover:text-white': buses.prev_page_url != null
                    }"
                    @click="page -= 1" class="flex items-center px-4 py-1 text-gray-500 bg-gray-100 border-t border-b border-l border-gray-200 rounded-l-md">
                    &#10094;
                    </button>
                    <button
                    :disabled="buses.next_page_url == null"
                    :class="{
                        'cursor-not-allowed': buses.next_page_url == null,
                        'hover:bg-blue-400 hover:text-white': buses.next_page_url != null
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
                                            <button @click="show_search = true">&#10061; Cari...</button>
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Nomor Plat
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Nomor Bus
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Distributor
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Ukuran
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    <tr v-if="show_search">
                                        <th colspan="6">
                                            <div class="flex">
                                                <div class="flex-1">
                                                    <input v-model="search" type="text" class="block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cari berdasarkan plat number | bus number | distributor..." />
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
                                    <tr v-if="typeof buses.data != 'undefined' && !buses.data.length > 0">
                                        <td class="px-6 py-4 whitespace-nowrap" colspan="6">
                                            <div class="text-sm text-gray-900">Data tidak ditemukan...</div>
                                        </td>
                                    </tr>
                                    <tr :v-for="(bus, index) in buses.data">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ buses.from + index }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ bus.plat_number }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ bus.bus_number }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ bus.distributor }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ bus.ukuran }} Kursi</div>
                                        </td>
                                        <td class="px-6 py-4 text-sm text-right whitespace-nowrap">
                                            <router-link :to="{ name: 'bus.edit', params: {id: bus.id} }" class="px-4 py-1 mr-1 text-xs text-gray-700 bg-gray-200 rounded-md shadow-sm hover:text-indigo-900">Edit</router-link>
                                            <button @click="_deleteBusData(bus.id)" class="inline-block px-4 py-1 text-xs text-gray-700 bg-gray-200 rounded-md shadow-sm hover:text-indigo-900">Hapus</button>
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
export default {
    
}
</script>

<style>

</style>