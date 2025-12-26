import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Review } from '../types';
import { bikes } from '../data/bikes';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Reviews - Dehradun Bike Rentals';
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBikeName = (bikeId: string) => {
    const bike = bikes.find(b => b.id === bikeId);
    return bike?.name || 'Unknown Bike';
  };

  return (
    <div className="pt-20">
      <div className="bg-primary-600 py-16">
        <div className="container-custom">
          <motion.h1 
            className="heading-xl text-white mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Customer Reviews
          </motion.h1>
          <motion.p 
            className="text-lg text-primary-100 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            See what our customers have to say about their rental experiences
          </motion.p>
        </div>
      </div>

      <div className="container-custom py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
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
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Link 
                  to={`/bikes/${review.bike_id}`}
                  className="text-primary-600 font-medium hover:text-primary-700 mb-2 block"
                >
                  {getBikeName(review.bike_id)}
                </Link>

                <p className="text-gray-600">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No reviews yet. Be the first to share your experience!</p>
            <Link to="/bikes" className="btn btn-primary">
              Browse Bikes to Review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;