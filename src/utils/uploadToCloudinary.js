import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Buat di dashboard Cloudinary
  formData.append("cloud_name", "YOUR_CLOUD_NAME");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      formData
    );
    return res.data.secure_url; // URL gambar yang berhasil di-upload
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
