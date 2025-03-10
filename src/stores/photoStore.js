import { defineStore } from 'pinia';

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    photos: [],
    loading: false,
    error: null,
    albumIds: [],
    sortBy: null,
    sortDirection: 'asc',
    page: 1,
    perPage: 30,
  }),
  actions: {
    async fetchPhotos() {
      this.loading = true;
      this.error = null;
      this.photos = [];
      this.page = 1;

      try {
        const url = new URL('https://jsonplaceholder.typicode.com/photos');

        if (this.albumIds.length) {
          this.albumIds.forEach(id => url.searchParams.append('albumId', id));
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

        this.photos = await response.json();
      } catch (error) {
        this.error = error.message || 'Неизвестная ошибка';
      } finally {
        this.loading = false;
      }
    },
    loadMore() {
      this.page += 1;
    },
  },
  getters: {
    sortedPhotos: (state) => {
      if (!state.sortBy) return state.photos;
      return [...state.photos].sort((a, b) => {
        const dir = state.sortDirection === 'asc' ? 1 : -1;
        const valueA = a[state.sortBy];
        const valueB = b[state.sortBy];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return (valueA - valueB) * dir;
        }
        return String(valueA).localeCompare(String(valueB)) * dir;
      });
    },
    paginatedPhotos: (state) => {
      const start = 0;
      const end = state.page === 1 ? 30 : 30 + (state.page - 1) * 20;
      return state.sortedPhotos.slice(start, end);
    },
  },
});