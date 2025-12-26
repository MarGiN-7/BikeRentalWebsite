import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Star, Edit2, Trash2, MessageCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '../../contexts/AuthContext';
import { Review } from '../../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface ReviewFormData {
  rating: number;
  comment: string;
}

interface ReviewSectionProps {
  bikeId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ bikeId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ReviewFormData>();

  useEffect(() => {
    fetchReviews();
  }, [bikeId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('bike_id', bikeId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        bike_id: bikeId,
        user_id: user.id,
        rating: data.rating,
        comment: data.comment,
        user_name: user.name || 'Anonymous',
        user_avatar: user.avatar,
      });

      if (error) throw error;

      reset();
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="heading-lg mb-2">Customer Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.round(Number(averageRating))
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
                <span className="text-gray-600">({reviews.length} reviews)</span>
              </div>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn btn-primary"
              >
                <MessageCircle size={18} className="mr-2" />
                Write a Review
              </button>
            ) : (
              <a href="/login?redirect=bikes" className="btn btn-primary">
                Login to Review
              </a>
            )}
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-6 rounded-lg mb-8">
                  <div className="mb-4">
                    <label className="label">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="cursor-pointer">
                          <input
                            type="radio"
                            value={value}
                            className="sr-only"
                            {...register('rating', { required: true })}
                          />
                          <Star
                            size={24}
                            className={`transition-colors ${
                              Number(watch('rating')) >= value
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </label>
                      ))}
                    </div>
                    {errors.rating && (
                      <p className="text-error-600 text-sm mt-1">Please select a rating</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="comment" className="label">Your Review</label>
                    <textarea
                      id="comment"
                      rows={4}
                      className={`input ${errors.comment ? 'border-error-500' : ''}`}
                      placeholder="Share your experience with this bike..."
                      {...register('comment', { required: true })}
                    ></textarea>
                    {errors.comment && (
                      <p className="text-error-600 text-sm mt-1">Please write your review</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-xl mr-4">
                      {review.user_name[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{review.user_name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {user?.id === review.user_id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-2 text-gray-500 hover:text-error-600 transition-colors"
                        title="Delete review"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-gray-600">{review.comment}</p>
              </motion.div>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;