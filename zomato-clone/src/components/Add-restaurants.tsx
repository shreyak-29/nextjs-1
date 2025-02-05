import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface RestaurantForm {
  name: string;
  description: string;
  imageUrl: string;
  rating: string;
  cuisine: string;
  location: string;
}

const AddRestaurant = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imageType, setImageType] = useState<'file' | 'url'>('file'); // Toggle between file and URL

  const [newRestaurant, setNewRestaurant] = useState<RestaurantForm>({
    name: '',
    description: '',
    imageUrl: '',
    rating: '',
    cuisine: '',
    location: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cookies] = useCookies(['token']);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    if (!newRestaurant.name || !newRestaurant.description || (imageType === 'file' && !imageFile) || (imageType === 'url' && !newRestaurant.imageUrl)) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
  
    try {
      const token = cookies.token;
      if (!token) throw new Error('Authentication token missing');
  
      let formData = new FormData();
      formData.append('name', newRestaurant.name);
      formData.append('description', newRestaurant.description);
      formData.append('rating', newRestaurant.rating);
      formData.append('cuisine', newRestaurant.cuisine);
      formData.append('location', newRestaurant.location);
  
      if (imageType === 'url' && newRestaurant.imageUrl) {
        formData.append('imageUrl', newRestaurant.imageUrl); // Append the image URL
      } else if (imageType === 'file' && imageFile) {
        formData.append('image', imageFile); // Append the file if imageType is 'file'
      }
      
  
      // Axios POST request
      await axios.post('/api/restaurants', formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Reset form after successful submission
      setNewRestaurant({
        name: '',
        description: '',
        imageUrl: '',
        rating: '',
        cuisine: '',
        location: '',
      });
      setImageFile(null);
  
      router.push('/restaurant');
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || 'Failed to add restaurant.' : 'An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Add a New Restaurant</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {['name', 'description', 'rating', 'cuisine', 'location'].map((field) => (
            <div key={field}>
              {field === 'description' ? (
                <textarea
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={newRestaurant[field as keyof RestaurantForm]}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, [field]: e.target.value })}
                  required
                  disabled={isSubmitting}
                  rows={3}
                />
              ) : (
                <input
                  type={field === 'rating' ? 'number' : 'text'}
                  min={field === 'rating' ? '0' : undefined}
                  max={field === 'rating' ? '5' : undefined}
                  step={field === 'rating' ? '0.1' : undefined}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={newRestaurant[field as keyof RestaurantForm]}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, [field]: e.target.value })}
                  required
                  disabled={isSubmitting}
                />
              )}
            </div>
          ))}

          {/* Toggle between file and URL */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="file"
                checked={imageType === 'file'}
                onChange={() => setImageType('file')}
              />
              <span>Upload Image</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="url"
                checked={imageType === 'url'}
                onChange={() => setImageType('url')}
              />
              <span>Use Image URL</span>
            </label>
          </div>

          {/* Image Upload */}
          {imageType === 'file' && (
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
              disabled={isSubmitting}
            />
          )}

          {/* Image URL Input */}
          {imageType === 'url' && (
            <input
              type="url"
              placeholder="Image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={newRestaurant.imageUrl}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, imageUrl: e.target.value })}
              required={imageType === 'url'}  // Only make the URL field required if the image type is 'url'
              disabled={isSubmitting}
            />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700"
          >
            {isSubmitting ? 'Adding Restaurant...' : 'Add Restaurant'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/restaurant')}
            disabled={isSubmitting}
            className="w-full mt-4 py-3 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
