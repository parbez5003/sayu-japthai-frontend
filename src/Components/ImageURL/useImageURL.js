import { useState, useCallback } from "react";
import axios from "axios";

// Define the image hosting API URL
const image_hosting_api = `https://api.imgbb.com/1/upload?key=a7c623941e0f93c1a6b379243e2ca35f`;

// Custom hook for image upload
const useImageURL = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to upload an image and return its URL
  const uploadImage = useCallback(async (imageFile) => {
    if (!imageFile) return null;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedImageUrl = response?.data?.data?.display_url || "";
      setImageUrl(uploadedImageUrl);

      return uploadedImageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { imageUrl, uploadImage, loading, error };
};

export default useImageURL;
