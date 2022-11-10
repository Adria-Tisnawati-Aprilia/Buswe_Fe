<template>
  <div id="app">
    <nav class="bg-white border-2 shadow-sm">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex space-x-4">
              <div>
                <img src="img/buswe.jpeg" style="width: 100px;" alt="">
              </div>
              <div class="">
                <div class="text-gray-500 text-sm font-semibold">Aplikasi management</div>
                <div class="text-gray-500 text-lg font-semibold">Jadwal perjalanan BUSWE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

