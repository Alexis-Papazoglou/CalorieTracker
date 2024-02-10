import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase';
import { FoodItem } from '../src/globalTypes';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const useImageAnalysis = (url: string , description : string | null) => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<FoodItem[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // new loading state

  const takeImage = async () => {
    image && setImage(null); // clear the previous image to avoid memory leaks
    const { status: cameraPerm } = await ImagePicker.requestCameraPermissionsAsync();
  
    if (cameraPerm !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
  
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      let successResult = result as ImagePicker.ImagePickerSuccessResult;
      if (successResult.assets && successResult.assets.length > 0) {
        setImage(successResult.assets[0].uri);
      }
    }
  };

  const pickImageFromGallery = async () => {
    image && setImage(null); // clear the previous image to avoid memory leaks
    const { status: mediaLibPerm } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (mediaLibPerm !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }
  
    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      let successResult = result as ImagePicker.ImagePickerSuccessResult;
      if (successResult.assets && successResult.assets.length > 0) {
        setImage(successResult.assets[0].uri);
      }
    }
  };

  const analyzeImage = async () => {
    setLoading(true); // set loading to true when starting the upload
    try {
      if (!image) {
        console.error('No image selected');
        return;
      }

      const imageId = Date.now().toString();

      // create a reference to the image in Firebase Cloud Storage
      const imageRef = ref(storage, `images/${imageId}`);

      // Convert the URI to a Blob
      const res = await fetch(image);
      const blob = await res.blob();

      // upload the image to Firebase Cloud Storage
      const uploadTask = uploadBytesResumable(imageRef, blob);

      uploadTask.on('state_changed', 
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
          console.error('Upload error', error);
        }, 
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', imageUrl);

          // send the download URL and description to your backend
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageUrl,
              description: description || '',
            }),
          });

          if (response.ok) {
            console.log('Image uploaded successfully');
            const data = await response.json();
            setAnalysis(data);
          } else {
            console.error('Image upload failed');
            throw new Error('Image upload failed');
          }

          setLoading(false); // set loading to false when the backend response is processed
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error as Error);
      setLoading(false); // also set loading to false in case of error
    }
  };

  return { takeImage, pickImageFromGallery, analyzeImage, setImage, image , analysis, error, loading }; // include analyzeImage in the return value
};

export default useImageAnalysis;