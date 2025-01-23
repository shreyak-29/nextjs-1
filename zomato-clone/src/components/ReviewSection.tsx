import { useState, useEffect } from 'react';
import { Trash2, Send, Loader2, Edit2 } from 'lucide-react';

// Types
interface Review {
  _id: string;
  content: string;
}

interface ApiError {
  msg?: string;
}

const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [updatedContent, setUpdatedContent] = useState('');

  // Authentication Check
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Helper function for API headers
  const getHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'x-auth-token': token }),
    };
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/reviews', {
        headers: getHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
      } else {
        const error: ApiError = await response.json();
        throw new Error(error.msg || 'Failed to fetch reviews');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Add New Review
  const handleAddReview = async () => {
    if (!newReview.trim()) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ content: newReview.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews((prev) => [...prev, data.review]);
        setNewReview('');
      } else {
        const error: ApiError = await response.json();
        throw new Error(error.msg || 'Failed to add review');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add review');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Review
  const handleDeleteReview = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (response.ok) {
        setReviews((prev) => prev.filter((review) => review._id !== id));
      } else {
        throw new Error('Failed to delete review');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete review');
    }
  };

  const handleEditReview = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ content: updatedContent.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews((prev) =>
          prev.map((review) =>
            review._id === id ? { ...review, content: data.review.content } : review
          )
        );
        setEditingReview(null);
        setUpdatedContent('');
      } else {
        const error: ApiError = await response.json();
        throw new Error(error.msg || 'Failed to update review');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update review');
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddReview();
  };

  // Fetch reviews when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-600">Please log in to view and leave reviews.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Website Reviews</h2>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Add Review Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newReview.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Submit
            </button>
          </div>
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="group p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  {editingReview?._id === review._id ? (
                    <div className="flex-1">
                      <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleEditReview(review._id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingReview(null)}
                          className="px-4 py-2 bg-gray-300 text-white rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{review.content}</p>
                  )}

                  {/* Edit and Delete buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingReview(review)}
                      className="flex items-center justify-center h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-yellow-50"
                    >
                      <Edit2 className="h-4 w-4 text-yellow-500 hover:text-yellow-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="flex items-center justify-center h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                      aria-label="Delete review"
                    >
                      <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;