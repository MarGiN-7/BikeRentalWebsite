import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BikeCategory } from '../../types';
import { Check, ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  description: string;
  category: BikeCategory;
  imageUrl: string;
  features: string[];
  highlights: {
    title: string;
    value: string;
  }[];
  isReversed?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  description,
  category,
  imageUrl,
  features,
  highlights,
  isReversed = false,
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    const categoryParam = category.toLowerCase().split(' ')[0];
    navigate(`/bikes?category=${categoryParam}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
          <motion.div 
            className="w-full md:w-1/2 cursor-pointer group"
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={handleCategoryClick}
          >
            <div className="rounded-lg overflow-hidden h-[500px] shadow-xl relative">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-lg mb-4">{title}</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-sm text-gray-600">{highlight.title}</p>
                  <p className="text-lg font-semibold text-primary-600">{highlight.value}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={18} className="text-primary-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleCategoryClick}
              className="btn btn-primary inline-flex items-center group"
            >
              Explore {category}
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;