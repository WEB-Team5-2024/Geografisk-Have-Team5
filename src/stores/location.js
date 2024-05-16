import { defineStore } from 'pinia';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const useLocationStore = defineStore('location', {
  state: () => ({
    currentPosition: { lat: null, lng: null },
    gardenAreas: [],
    selectedArea: null,
  }),
  actions: {
    async fetchGardenAreas() {
      try {
        const querySnapshot = await getDocs(collection(db, 'areas'));
        this.gardenAreas = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            lat: data.lat || null,
            lng: data.lng || null,
            distance: null,
            imageURL: data.imageURL,
          };
        });
        this.calculateDistances();
      } catch (error) {
        console.error('Error fetching garden areas:', error);
      }
    },
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
      const earthRadiusInMeters = 6371e3; // Radius of the Earth in meters
      const latitude1InRadians = pos1.lat * Math.PI / 180;
      const latitude2InRadians = pos2.lat * Math.PI / 180;
      const latitudeDifferenceInRadians = (pos2.lat - pos1.lat) * Math.PI / 180;
      const longitudeDifferenceInRadians = (pos2.lng - pos1.lng) * Math.PI / 180;
      const haversineFormulaComponent = Math.sin(latitudeDifferenceInRadians / 2) * Math.sin(latitudeDifferenceInRadians / 2) +
                      Math.cos(latitude1InRadians) * Math.cos(latitude2InRadians) *
                      Math.sin(longitudeDifferenceInRadians / 2) * Math.sin(longitudeDifferenceInRadians / 2);
      const angularDistanceInRadians = 2 * Math.atan2(Math.sqrt(haversineFormulaComponent), Math.sqrt(1 - haversineFormulaComponent));
      return Math.round(earthRadiusInMeters * angularDistanceInRadians); // Distance in meters
    }
  }
});
