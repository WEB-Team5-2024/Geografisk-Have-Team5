<template>
  <div class="menuContainer">
    <div class="menuItem" v-for="event in events" :key="event.id" @click="() => navigateToEvent(event.id)">
      <div class="imageContainer">
        <img :src="event.imageUrl || '/default-image.jpg'" :alt="`${event.title} Image`" class="eventImage" />
      </div>
      <div class="textContainer">
        <h3>{{ event.title }}</h3>
        <p class="eventDate">{{ event.date ? new Date(event.date).toLocaleDateString() : '' }}</p>
        <p :class="{ 'truncated': !showFullText[event.id] }">{{ event.description }}</p>
        <span v-if="event.description.length > maxCharacters" @click.stop="toggleShowFullText(event.id)" class="show-more">{{ showFullText[event.id] ? 'Vis mindre info' : 'Vis mere info' }}</span>
      </div>
      <i class="bi bi-arrow-right-circle navigateIcon"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFirebaseStorage1 } from '@/composables/useFirebaseStorage1';

const router = useRouter();
const db = getFirestore();
const events = ref([]);
const { loadImage } = useFirebaseStorage1();
const showFullText = ref({});
const maxCharacters = 100; // Adjust as needed

onMounted(async () => {
  const eventsCollectionRef = collection(db, 'events');
  const querySnapshot = await getDocs(eventsCollectionRef);
  events.value = await Promise.all(querySnapshot.docs.map(async doc => {
    const data = doc.data();
    data.id = doc.id;
    data.date = data.date && data.date.toDate ? data.date.toDate() : new Date(data.date).toISOString();
    data.imageUrl = await loadImage(`images/${data.title.trim()}.png`);
    return data;
  }));
});

function navigateToEvent(id) {
  router.push({ name: 'event-detail', params: { id } });
}


function toggleShowFullText(id) {
  showFullText.value[id] = !showFullText.value[id];
}
</script>

<style scoped lang="scss">
@import '@/styles/global.scss';
@import 'bootstrap-icons/font/bootstrap-icons.css';

.menuContainer {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;

  .menuItem {
    display: flex;
    align-items: center;
    background-color: $secondary-color;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
    color: $font-color;
    cursor: pointer;

    &:hover {
      background-color: darken($secondary-color, 5%);
    }

    .imageContainer {
      flex-shrink: 0;
      width: 100px;
      height: 100px;
      border-radius: 10px;
      overflow: hidden;

      .eventImage {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .textContainer {
      flex-grow: 1;
      width: 50%;

      h3 {
        font-size: $medium-font-size;
        color: $font-color;
      }

      .eventDate {
        font-size: $extra-small-font-size;
        color: darken($font-color, 20%);
      }

      p.truncated {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        }

      .show-more {
        color: $distancetext-color; /* Or any other color */
        cursor: pointer;
        font-size: $small-font-size;
      }
    }

    .navigateIcon {
      font-size: 30px;
      color: $font-color;
      margin-left: auto;
    }
  }
}
</style>
