// store/location.js
import { defineStore } from 'pinia';

export const useLocationStore = defineStore({
  id: 'location',
  state: () => ({
    currentPosition: { lat: null, lng: null }, // Initialize with null lat and lng
    selectedArea: null,
  }),
  actions: {
    updateCurrentPosition(position) {
      this.currentPosition.lat = position.lat;
      this.currentPosition.lng = position.lng;
    },
    updateSelectedArea(area) {
      this.selectedArea = area;
    },
  },
  getters: {
    getCurrentPosition: (state) => state.currentPosition,
    getSelectedArea: (state) => state.selectedArea,
  },
});
