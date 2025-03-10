<template>
  <div class="max-w-[600px] max-h-[600px] mx-auto overflow-auto border border-gray-300 dark:border-gray-700">
    <table v-if="!loading" class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-800 sticky top-0">
          <th
            v-for="(header, key) in headers"
            :key="key"
            @click="sortBy(key)"
            class="p-2 cursor-pointer text-white  border-b dark:border-gray-700"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="photo in paginatedPhotos" :key="photo.id" class="border-b dark:border-gray-700">
          <td class="p-2 truncate text-white-800" :title="photo.id">{{ photo.id }}</td>
          <td class="p-2 truncate text-white-800" :title="photo.albumId">{{ photo.albumId }}</td>
          <td class="p-2 truncate text-white-800" :title="photo.title">{{ photo.title }}</td>
          <td class="p-2 truncate text-white-800" :title="photo.url">
            <a :href="photo.url" target="_blank" rel="noopener noreferrer">{{ photo.url }}</a>
          </td>
          <td class="p-2 truncate text-white-800">
            <a :href="photo.thumbnailUrl" alt="">{{ photo.thumbnailUrl }}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="p-4">
      <SkeletonLoader />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { usePhotoStore } from '../stores/photoStore';
import SkeletonLoader from './SkeletonLoader.vue';

const photoStore = usePhotoStore();

const headers = {
  id: 'Ид',
  albumId: 'Альбом',
  title: 'Название',
  url: 'Ссылка',
  thumbnailUrl: 'Миниатюра',
};

const paginatedPhotos = computed(() => photoStore.paginatedPhotos);
const loading = computed(() => photoStore.loading);

const sortBy = (key) => {
  if (photoStore.sortBy === key) {
    photoStore.sortDirection = photoStore.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    photoStore.sortBy = key;
    photoStore.sortDirection = 'asc';
  }
};

const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  if (scrollHeight - scrollTop <= clientHeight + 10) {
    photoStore.loadMore();
  }
};

onMounted(() => {
  document.querySelector('.overflow-auto').addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  document.querySelector('.overflow-auto')?.removeEventListener('scroll', handleScroll);
});
</script>