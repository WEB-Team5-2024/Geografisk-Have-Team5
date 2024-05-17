import { ref } from 'vue';
import { getStorage, ref as firebaseRef, getDownloadURL } from 'firebase/storage';

// Dette er en Vue composable funktion, der tilbyder reaktive billede-URL'er fra Firebase Storage.
export function useFirebaseStorage() {
    // Reaktiv reference til billede-URL'en, initialiseret med en standard billede sti.
    const imageUrl = ref('/default-image.jpg');

    // Asynkron funktion til at indlæse et billede fra en given filsti i Firebase Storage.
    const loadImage = async (filePath) => {
        try {
            // Hent storage-instansen.
            const storage = getStorage();
            // Opret en reference til filen i storage ved hjælp af filstien.
            const storageReference = firebaseRef(storage, filePath);
            // Hent download URL'en for filen.
            const url = await getDownloadURL(storageReference);
            // Opdater den reaktive billede-URL med den hentede URL.
            imageUrl.value = url;
        } catch (error) {
            // Hvis der er en fejl, log den til konsollen.
            console.error('Fejl ved hentning af download URL:', error);
            // Bevar standard billedet URL'en, hvis der er en fejl.
            imageUrl.value = '/default-image.jpg';
        }
    };

    // Returner den reaktive billede-URL og loadImage-funktionen fra den composable.
    return { imageUrl, loadImage };
}
