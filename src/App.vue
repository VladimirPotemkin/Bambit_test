<template>
  <div :class="currentTheme" class="min-h-screen flex flex-col items-center justify-center ">
    <button @click="toggleTheme" class="fixed top-4 right-4 z-50">
      {{ isDark ? '🌙' : '☀️' }}
    </button>
    <h1 class="text-2xl font-bold mb-4 text-white-800 dark:text-dark">Фотографии</h1>
    <SearchBar />
    <PhotoTable />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SearchBar from './components/SearchBar.vue';
import PhotoTable from './components/PhotoTable.vue';

const isDark = ref(localStorage.getItem('theme') === 'dark');
const currentTheme = computed(() => (isDark.value ? 'dark' : 'light'));

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', isDark.value);
};

onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value);
});
</script>

