import { useState } from 'react';

export default function ImagePreview({ url, alt }) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
        Invalid image URL. Please provide a valid image URL.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
      <div className="border rounded-lg overflow-hidden w-48 h-48">
        <img
          src={url}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      </div>
    </div>
  );
}