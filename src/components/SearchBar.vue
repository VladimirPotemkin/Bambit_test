<template>
  <div class="flex gap-2 mb-4 m-4 justify-center items-center m-w-600">
    <input
      v-model="inputValue"
      placeholder="Введите ID альбомов 1 2 3"
      class=" border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 transition w-[530px]"/>
    <button
      @click="handleSearch"
      :disabled="loading"
      class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition disabled:bg-gray-300 relative"
    >
      <span v-if="!loading">Поиск</span>
      <span v-else class="flex items-center justify-center">
        <svg
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePhotoStore } from '../stores/photoStore';

const photoStore = usePhotoStore();
const inputValue = ref('');
const loading = ref(false);

const handleSearch = async () => {
  loading.value = true;

  if (!inputValue.value.trim()) {
    photoStore.albumIds = [];
  } else {
    const ids = inputValue.value
      .split(' ')
      .filter(id => /^\d+$/.test(id.trim()))
      .map(Number);

    if (!ids.length) {
      alert('Введите корректные ID альбомов.');
      loading.value = false;
      return;
    }

    photoStore.albumIds = ids;
  }

  try {
    await photoStore.fetchPhotos();
    inputValue.value = '';
  } catch (error) {
    console.error('Ошибка поиска:', error);
    alert('Произошла ошибка при загрузке данных.');
  } finally {
    loading.value = false;
  }
};
</script>