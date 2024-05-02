import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export function useFirebaseStorage1() {
    // Asynchronous function to load an image from Firebase Storage by the file path.
    const loadImage = async (filePath) => {
        const storage = getStorage();
        const storageReference = storageRef(storage, filePath);
        try {
            const url = await getDownloadURL(storageReference);
            return url;  // Return the URL directly
        } catch (error) {
            console.error('Error fetching download URL:', error);
            return '/default-image.jpg';  // Return default image path in case of an error
        }
    };

    // Return only the loadImage function from the composable.
    return { loadImage };
}
