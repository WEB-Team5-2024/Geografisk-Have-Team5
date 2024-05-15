import { defineStore } from 'pinia';

export const useLocationStore = defineStore('location', {
  state: () => ({
    currentPosition: { lat: null, lng: null },
    gardenAreas: [
      { id: 'kina', name: 'Kina', lat: 55.473884, lng: 9.494414, distance: null, color: 'red' },
      { id: 'japan', name: 'Japan', lat: 55.472204, lng: 9.494612, distance: null, color: 'white' },
      { id: 'europa', name: 'Europa', lat: 55.471681, lng: 9.495576, distance: null, color: 'blue' },
      { id: 'nordamerika', name: 'Nord Amerika', lat: 55.470916, lng: 9.495305, distance: null, color: 'red' },
      { id: 'sydamerika', name: 'Syd Amerika', lat: 55.470757, lng: 9.494155, distance: null, color: 'green' },
      { id: 'asien', name: 'Asien', lat: 55.474452, lng: 9.493133, distance: null, color: 'yellow' }
    ],
    selectedArea: null
  }),
  actions: {
    updateCurrentPosition(position) {
      this.currentPosition = position;
      this.calculateDistances();
    },
    updateSelectedArea(area) {
      this.selectedArea = area;
      this.calculateDistances();
    },
    calculateDistances() {
      if (this.currentPosition.lat !== null && this.currentPosition.lng !== null) {
        this.gardenAreas.forEach(area => {
          if (area.lat !== null && area.lng !== null) {
            area.distance = this.calculateDistance(this.currentPosition, { lat: area.lat, lng: area.lng });
          }
        });
        if (this.selectedArea && this.selectedArea.lat !== null && this.selectedArea.lng !== null) {
          this.selectedArea.distance = this.calculateDistance(this.currentPosition, { lat: this.selectedArea.lat, lng: this.selectedArea.lng });
        }
      }
    },
    calculateDistance(pos1, pos2) {
      const R = 6371e3; // Radius of the Earth in meters
      const φ1 = pos1.lat * Math.PI / 180;
      const φ2 = pos2.lat * Math.PI / 180;
      const Δφ = (pos2.lat - pos1.lat) * Math.PI / 180;
      const Δλ = (pos2.lng - pos1.lng) * Math.PI / 180;
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = Math.round(R * c); // Distance in meters
      return distance;
    }
  }
});
