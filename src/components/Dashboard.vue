<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-sm text-gray-500 mt-1">Kelola pengaturan masjid</p>
          </div>
          <button
            @click="logout"
            class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tabs Navigation -->
      <div class="mb-6 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'prayer'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'prayer'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Waktu Sholat
            </span>
          </button>
          <button
            @click="activeTab = 'schedule'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'schedule'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Jadwal Penceramah
            </span>
          </button>
          <button
            @click="activeTab = 'hadits'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'hadits'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Hadits
            </span>
          </button>
          <button
            @click="activeTab = 'settings'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pengaturan
            </span>
          </button>
        </nav>
      </div>

      <!-- Prayer Times Tab -->
      <div v-show="activeTab === 'prayer'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Waktu Sholat & Iqomah
            </h2>
            <p class="text-sm text-gray-600 mt-1">Atur waktu sholat dan iqomah untuk setiap waktu sholat</p>
          </div>
          <form @submit.prevent="submitFormSholat" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Subuh -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Subuh</label>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Waktu Sholat</label>
                    <input
                      type="text"
                      v-model="sholat.fajr"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Iqomah</label>
                    <input
                      type="text"
                      v-model="iqomah.fajr"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                </div>
              </div>

              <!-- Syuruq -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Syuruq</label>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Waktu Sholat</label>
                  <input
                    type="text"
                    v-model="sholat.sunrise"
                    class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="HH:MM"
                  />
                </div>
              </div>

              <!-- Dzuhur -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Dzuhur</label>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Waktu Sholat</label>
                    <input
                      type="text"
                      v-model="sholat.dhuhr"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Iqomah</label>
                    <input
                      type="text"
                      v-model="iqomah.dhuhr"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                </div>
              </div>

              <!-- Ashar -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Ashar</label>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Waktu Sholat</label>
                    <input
                      type="text"
                      v-model="sholat.asr"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Iqomah</label>
                    <input
                      type="text"
                      v-model="iqomah.asr"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                </div>
              </div>

              <!-- Maghrib -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Maghrib</label>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Waktu Sholat</label>
                    <input
                      type="text"
                      v-model="sholat.maghrib"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Iqomah</label>
                    <input
                      type="text"
                      v-model="iqomah.maghrib"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                </div>
              </div>

              <!-- Isya -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Isya</label>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Waktu Sholat</label>
                    <input
                      type="text"
                      v-model="sholat.isha"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Iqomah</label>
                    <input
                      type="text"
                      v-model="iqomah.isha"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="HH:MM"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Schedule Tab -->
      <div v-show="activeTab === 'schedule'" class="space-y-6">
        <!-- Main Schedule -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ ceramahLabel }}
            </h2>
            <p class="text-sm text-gray-600 mt-1">Kelola jadwal penceramah harian</p>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penceramah / Imam</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(entry, index) in schedule_main" :key="index" class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 whitespace-nowrap">
                      <input
                        v-model="entry.lecturer"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nama penceramah"
                      />
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <input
                        v-model="entry.date"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="DD-MM-YYYY"
                      />
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        @click="editEntryMain(entry.id, entry.lecturer, entry.date)"
                        class="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Simpan
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Jumat Schedule -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Penceramah Jumat
            </h2>
            <p class="text-sm text-gray-600 mt-1">Kelola jadwal khatib Jumat</p>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khatib</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(entry, index) in schedule_jumah" :key="index" class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 whitespace-nowrap">
                      <input
                        v-model="entry.lecturer"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nama khatib"
                      />
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <input
                        v-model="entry.date"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="DD-MM-YYYY"
                      />
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        @click="editEntryJumat(entry.id, entry.lecturer, entry.date)"
                        class="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Simpan
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Hadits Tab -->
      <div v-show="activeTab === 'hadits'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Hadits
            </h2>
            <p class="text-sm text-gray-600 mt-1">Kelola hadits yang ditampilkan di layar</p>
          </div>
          <div class="p-6">
            <div v-for="(entry, index) in hadits" :key="index" class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Hadits {{ index + 1 }}</label>
              <textarea
                v-model="entry.hadits"
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                placeholder="Masukkan hadits..."
              />
            </div>
            <div class="flex justify-end">
              <button
                @click="updateHadits()"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-show="activeTab === 'settings'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pengaturan Umum
            </h2>
            <p class="text-sm text-gray-600 mt-1">Kelola informasi dan pengaturan aplikasi</p>
          </div>
          <form @submit.prevent="submitFormInformation" class="p-6">
            <div class="space-y-6">
              <div v-for="(info, index) in filteredInformation" :key="index" class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">{{ info.info }}</label>
                <input
                  type="text"
                  :id="info.key"
                  v-model="info.detail"
                  class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="`Masukkan ${info.info.toLowerCase()}`"
                />
              </div>

              <!-- Mode Ramadhan -->
              <div class="pt-4 border-t border-gray-200">
                <label class="block text-sm font-semibold text-gray-700 mb-3">Mode Ramadhan</label>
                <div class="flex items-center gap-6">
                  <label class="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="ramadan_mode"
                      :value="true"
                      v-model="ramadan_mode"
                      @change="updateRamadanMode(true)"
                      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span class="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">Aktif</span>
                  </label>
                  <label class="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="ramadan_mode"
                      :value="false"
                      v-model="ramadan_mode"
                      @change="updateRamadanMode(false)"
                      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span class="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">Tidak Aktif</span>
                  </label>
                </div>
                <p class="mt-2 text-xs text-gray-500">Aktifkan mode Ramadhan untuk menampilkan jadwal tarawih</p>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      activeTab: "prayer",
      information: [],
      hadits: [],
      sholat: {
        fajr: "",
        sunrise: "",
        dhuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
      },
      iqomah: {
        fajr: "",
        sunrise: "",
        dhuhr: "",
        asr: "",
        maghrib: "",
        isha: "",
      },
      schedule_main: [{ id: "", lecturer: "", date: "" }],
      schedule_jumah: [{ id: "", lecturer: "", date: "" }],
      ceramah_title: process.env.VUE_APP_CERAMAH_MAIN || "Penceramah Subuh",
      ramadan_mode: false,
    };
  },
  computed: {
    ceramahTableName() {
      return this.ramadan_mode ? "penceramah_tarawih" : "penceramah_subuh";
    },
    ceramahLabel() {
      return this.ramadan_mode
        ? "Imam dan Penceramah Tarawih"
        : "Penceramah Subuh";
    },
    filteredInformation() {
      return this.information.filter((info) => info.key !== "ramadan_mode");
    },
  },
  async mounted() {
    await this.getRamadanMode();
    await this.getPenceramahMain();
    this.getPenceramahJumat();
    this.getSholat();
    this.getInformation();
    this.getHadits();
  },
  methods: {
    getRamadanMode: async function () {
      let { data } = await this.$store.state.database
        .from("information")
        .select("*")
        .eq("key", "ramadan_mode")
        .maybeSingle();

      if (data && data.detail !== null && data.detail !== undefined) {
        const detailValue = String(data.detail).toLowerCase().trim();
        this.ramadan_mode = detailValue === "true" || detailValue === "1";
      } else {
        this.ramadan_mode = false;
      }
    },
    updateRamadanMode: async function (value) {
      const { data: existing } = await this.$store.state.database
        .from("information")
        .select("*")
        .eq("key", "ramadan_mode")
        .single();

      let error = null;
      if (existing) {
        const { error: updateError } = await this.$store.state.database
          .from("information")
          .update({
            info: "Mode Ramadhan",
            detail: value ? "true" : "false",
          })
          .eq("key", "ramadan_mode");
        error = updateError;
      } else {
        const { error: insertError } = await this.$store.state.database
          .from("information")
          .insert({
            key: "ramadan_mode",
            info: "Mode Ramadhan",
            detail: value ? "true" : "false",
          });
        error = insertError;
      }

      if (error) {
        this.toast.error(error.message);
      } else {
        this.ramadan_mode = value;
        await this.getPenceramahMain();
        this.toast.success("Mode Ramadhan berhasil diubah");
      }
    },
    getPenceramahMain: async function () {
      let { data } = await this.$store.state.database
        .from(this.ceramahTableName)
        .select("*")
        .order("id");
      this.schedule_main = data;
    },
    getPenceramahJumat: async function () {
      let { data } = await this.$store.state.database
        .from("penceramah_jumat")
        .select("*")
        .order("id");
      this.schedule_jumah = data;
    },
    getSholat: async function () {
      let { data } = await this.$store.state.database
        .from("pray_time")
        .select("*")
        .order("id");
      this.sholat = {
        fajr: data[2].exact_time,
        sunrise: data[1].exact_time,
        dhuhr: data[3].exact_time,
        asr: data[4].exact_time,
        maghrib: data[5].exact_time,
        isha: data[6].exact_time,
      };
      this.iqomah = {
        fajr: data[2].iqomah,
        sunrise: data[1].iqomah,
        dhuhr: data[3].iqomah,
        asr: data[4].iqomah,
        maghrib: data[5].iqomah,
        isha: data[6].iqomah,
      };
    },
    getInformation: async function () {
      let { data } = await this.$store.state.database
        .from("information")
        .select("*")
        .order("id");
      this.information = data;
    },
    getHadits: async function () {
      let { data } = await this.$store.state.database
        .from("hadits")
        .select("*")
        .order("id");
      this.hadits = data;
    },
    updatePenceramahMain: async function (id, lecturer, date) {
      const { error } = await this.$store.state.database
        .from(this.ceramahTableName)
        .update({ lecturer, date })
        .eq("id", id)
        .select();
      if (error) {
        this.toast.error(error);
      } else {
        await this.getPenceramahMain();
        this.toast.success("Sukses merubah data");
      }
    },
    updatePenceramahJumat: async function (id, lecturer, date) {
      const { error } = await this.$store.state.database
        .from("penceramah_jumat")
        .update({ lecturer, date })
        .eq("id", id)
        .select();
      if (error) {
        this.toast.error(error);
      } else {
        await this.getPenceramahJumat();
        this.toast.success("Sukses merubah data");
      }
    },
    updateHadits: async function () {
      for (let ha of this.hadits) {
        const { error } = await this.$store.state.database
          .from("hadits")
          .update({ hadits: ha.hadits })
          .eq("id", ha.id)
          .select();
        if (error) {
          this.toast.error(error);
        }
      }
      await this.getHadits();
      this.toast.success("Sukses merubah data");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    addEntry() {
      this.schedule_main.push({ lecturer: "", time: "" });
    },
    async editEntryMain(index, lecturer, date) {
      await this.updatePenceramahMain(index, lecturer, date);
    },
    async editEntryJumat(index, lecturer, date) {
      await this.updatePenceramahJumat(index, lecturer, date);
    },
    async submitFormSholat() {
      let errorMessage = "";
      for (let s in this.sholat) {
        const { error } = await this.$store.state.database
          .from("pray_time")
          .update({ exact_time: this.sholat[s], iqomah: this.iqomah[s] })
          .eq("time", s)
          .select();
        if (error) {
          errorMessage = error;
        }
      }

      if (errorMessage) {
        this.toast.error(errorMessage);
      } else {
        this.toast.success("Berhasil Merubah Data");
        this.getSholat();
      }
    },
    async submitFormInformation() {
      let errorMessage = "";
      for (let s in this.information) {
        const { error } = await this.$store.state.database
          .from("information")
          .update({ detail: this.information[s].detail })
          .eq("key", this.information[s].key)
          .select();
        if (error) {
          errorMessage = error;
        }
      }

      if (errorMessage) {
        this.toast.error(errorMessage);
      } else {
        this.toast.success("Berhasil Merubah Data");
        this.getSholat();
      }
    },
  },
};
</script>

<style scoped></style>
