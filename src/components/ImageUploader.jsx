import { useState, useEffect, useRef } from 'react';

export default function ImageUploader({ bookData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:3000/${bookData?.image}`);
    }
  }, [bookData]);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        required
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          <p>Selected Image</p>
        </div>
      )}
    </div>
  );
}
