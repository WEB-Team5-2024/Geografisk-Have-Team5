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
      console.log("Current Position Updated:", position); // Log the updated position
      this.calculateDistances();
    },
    updateSelectedArea(area) {
      this.selectedArea = area;
      console.log("Selected Area Updated:", area); // Log the updated selected area
      this.calculateDistances();
    },
    calculateDistances() {
      if (this.currentPosition.lat && this.currentPosition.lng) {
        console.log("Starting distance calculations from current position:", this.currentPosition);
        this.gardenAreas.forEach(area => {
          if (area.lat && area.lng) {
            area.distance = this.calculateDistance(this.currentPosition, { lat: area.lat, lng: area.lng });
            console.log(`Distance to ${area.name} calculated:`, area.distance, "meters", this.gardenAreas);
          }
        });
        if (this.selectedArea && this.selectedArea.lat && this.selectedArea.lng) {
          this.selectedArea.distance = this.calculateDistance(this.currentPosition, { lat: this.selectedArea.lat, lng: this.selectedArea.lng });
          console.log(`Distance to selected area ${this.selectedArea.name} calculated:`, this.selectedArea.distance, "meters");
        }
      }
    },
    calculateDistance(pos1, pos2) {
      console.log("Starting distance calculation:");
      console.log(`From position: Latitude ${pos1.lat}, Longitude ${pos1.lng}`);
      console.log(`To position: Latitude ${pos2.lat}, Longitude ${pos2.lng}`);
  
      const R = 6371e3; // Radius of the Earth in meters
      console.log(`Earth's radius: ${R} meters`);
  
      // Convert latitude and longitude from degrees to radians
      const φ1 = pos1.lat * Math.PI / 180;
      const φ2 = pos2.lat * Math.PI / 180;
      console.log(`Latitude in radians: φ1 = ${φ1}, φ2 = ${φ2}`);
  
      // Difference in coordinates
      const Δφ = (pos2.lat - pos1.lat) * Math.PI / 180;
      const Δλ = (pos2.lng - pos1.lng) * Math.PI / 180;
      console.log(`Difference in latitude (Δφ): ${Δφ}`);
      console.log(`Difference in longitude (Δλ): ${Δλ}`);
  
      // Haversine formula
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      console.log(`Haversine formula result (a): ${a}`);
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      console.log(`Angular distance in radians (c): ${c}`);
  
      const distance = Math.round(R * c); // Distance in meters
      console.log(`Calculated distance: ${distance} meters`);
  
      return distance;
  }
  
  }
});
