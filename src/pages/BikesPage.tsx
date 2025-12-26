import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BikeCard from '../components/ui/BikeCard';
import { bikes, getBikesByCategory } from '../data/bikes';
import { Bike, BikeCategory } from '../types';
import { Search, Filter, SlidersHorizontal, X, Check, ArrowUpDown, Bike as BikeIcon } from 'lucide-react';

const BikesPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [engineSize, setEngineSize] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([20, 60]);
  const [availability, setAvailability] = useState<boolean | null>(null);

  // Get unique engine sizes
  const engineSizes = Array.from(
    new Set(bikes.map(bike => bike.specifications.engine?.replace(/cc$/, '')).filter(Boolean))
  ).sort((a, b) => Number(a) - Number(b));

  useEffect(() => {
    document.title = 'Our Bikes - Dehradun Bike Rentals';
    
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
      
      const categoryMap: Record<string, BikeCategory> = {
        'urban': BikeCategory.URBAN,
        'touring': BikeCategory.TOURING,
        'mountain': BikeCategory.MOUNTAIN,
        'premium': BikeCategory.PREMIUM,
      };
      
      if (categoryMap[category]) {
        setFilteredBikes(getBikesByCategory(categoryMap[category]));
      } else {
        setFilteredBikes(bikes);
      }
    } else {
      setFilteredBikes(bikes);
    }
  }, [searchParams]);
  
  // Filter bikes based on search and filters
  const applyFilters = () => {
    let results = [...bikes];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(bike => 
        bike.name.toLowerCase().includes(term) || 
        bike.type.toLowerCase().includes(term) ||
        bike.category.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      const categoryMap: Record<string, BikeCategory> = {
        'urban': BikeCategory.URBAN,
        'touring': BikeCategory.TOURING,
        'mountain': BikeCategory.MOUNTAIN,
        'premium': BikeCategory.PREMIUM,
      };
      
      if (categoryMap[selectedCategory]) {
        results = results.filter(bike => bike.category === categoryMap[selectedCategory]);
      }
    }

    // Filter by engine size
    if (engineSize) {
      results = results.filter(bike => 
        bike.specifications.engine?.includes(engineSize)
      );
    }

    // Filter by price range
    results = results.filter(bike => 
      bike.dailyRate >= priceRange[0] && bike.dailyRate <= priceRange[1]
    );

    // Filter by mileage range
    results = results.filter(bike => {
      const [min, max] = bike.specifications.mileage?.split('-').map(Number) || [0, 0];
      return min >= mileageRange[0] && max <= mileageRange[1];
    });

    // Filter by availability
    if (availability !== null) {
      results = results.filter(bike => bike.availability === availability);
    }
    
    setFilteredBikes(results);
    setShowMobileFilters(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setEngineSize(null);
    setPriceRange([0, 3000]);
    setMileageRange([20, 60]);
    setAvailability(null);
    setFilteredBikes(bikes);
  };
  
  return (
    <div className="pt-20">
      {/* Hero Section with Dynamic Background */}
      <div className="relative bg-gray-900 py-16 overflow-hidden">
        {/* Animated Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'movePattern 20s linear infinite',
          }}
        />

        {/* Content */}
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BikeIcon size={48} className="text-primary-500 mx-auto mb-6" />
            <h1 className="heading-xl text-white mb-6">
              Explore Our Fleet
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              From urban commuters to adventure bikes, find your perfect ride in our extensive collection.
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search bikes by name, type, or category..." 
                className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
              />
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                onClick={applyFilters}
              >
                <Search size={20} />
              </button>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {Object.values(BikeCategory).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category.toLowerCase().split(' ')[0]);
                    applyFilters();
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === category.toLowerCase().split(' ')[0]
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="w-full btn bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              <SlidersHorizontal size={18} />
              Show Filters
            </button>
          </div>

          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showMobileFilters || !window.matchMedia('(max-width: 1024px)').matches) && (
              <motion.div
                className="w-full lg:w-1/4 lg:static fixed inset-0 z-50 bg-white lg:bg-transparent overflow-auto"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween' }}
              >
                <div className="bg-gray-900 rounded-lg shadow-xl p-6 sticky top-24 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Filter size={20} />
                      Filters
                    </h2>
                    <button
                      className="lg:hidden text-gray-400 hover:text-white"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Engine Size Filter */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Engine Size</h3>
                    <div className="space-y-3">
                      <label className="filter-option">
                        <input 
                          type="radio" 
                          name="engineSize" 
                          className="sr-only"
                          checked={!engineSize}
                          onChange={() => setEngineSize(null)}
                        />
                        <span className="flex items-center gap-2">
                          <span className="filter-checkbox">
                            {!engineSize && <Check size={14} />}
                          </span>
                          All Sizes
                        </span>
                      </label>
                      {engineSizes.map((size) => (
                        <label key={size} className="filter-option">
                          <input 
                            type="radio" 
                            name="engineSize" 
                            className="sr-only"
                            checked={engineSize === size}
                            onChange={() => setEngineSize(size)}
                          />
                          <span className="flex items-center gap-2">
                            <span className="filter-checkbox">
                              {engineSize === size && <Check size={14} />}
                            </span>
                            {size}cc
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Category Filter */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Category</h3>
                    <div className="space-y-3">
                      {[null, ...Object.values(BikeCategory)].map((category) => (
                        <label key={category || 'all'} className="filter-option">
                          <input 
                            type="radio" 
                            name="category" 
                            className="sr-only"
                            checked={selectedCategory === (category ? category.toLowerCase().split(' ')[0] : null)}
                            onChange={() => setSelectedCategory(category ? category.toLowerCase().split(' ')[0] : null)}
                          />
                          <span className="flex items-center gap-2">
                            <span className="filter-checkbox">
                              {selectedCategory === (category ? category.toLowerCase().split(' ')[0] : null) && <Check size={14} />}
                            </span>
                            {category || 'All Categories'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Slider */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Daily Price Range</h3>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="3000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary-500"
                    />
                  </div>

                  {/* Mileage Range Slider */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Mileage Range (km/l)</h3>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>{mileageRange[0]} km/l</span>
                      <span>{mileageRange[1]} km/l</span>
                    </div>
                    <input 
                      type="range"
                      min="20"
                      max="60"
                      step="5"
                      value={mileageRange[1]}
                      onChange={(e) => setMileageRange([mileageRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary-500"
                    />
                  </div>

                  {/* Availability Filter */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Availability</h3>
                    <div className="space-y-3">
                      <label className="filter-option">
                        <input 
                          type="radio" 
                          name="availability" 
                          className="sr-only"
                          checked={availability === null}
                          onChange={() => setAvailability(null)}
                        />
                        <span className="flex items-center gap-2">
                          <span className="filter-checkbox">
                            {availability === null && <Check size={14} />}
                          </span>
                          All Bikes
                        </span>
                      </label>
                      <label className="filter-option">
                        <input 
                          type="radio" 
                          name="availability" 
                          className="sr-only"
                          checked={availability === true}
                          onChange={() => setAvailability(true)}
                        />
                        <span className="flex items-center gap-2">
                          <span className="filter-checkbox">
                            {availability === true && <Check size={14} />}
                          </span>
                          Available Now
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button 
                      className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </button>
                    <button 
                      className="w-full py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                      onClick={resetFilters}
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Bikes Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h2 className="heading-md">{filteredBikes.length} Bikes Available</h2>
              <div className="flex-grow"></div>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={18} className="text-gray-500" />
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onChange={(e) => {
                    const sorted = [...filteredBikes].sort((a, b) => {
                      switch (e.target.value) {
                        case 'name':
                          return a.name.localeCompare(b.name);
                        case 'price-low':
                          return a.dailyRate - b.dailyRate;
                        case 'price-high':
                          return b.dailyRate - a.dailyRate;
                        case 'engine-size':
                          const engineA = Number(a.specifications.engine?.replace(/cc$/, '') || 0);
                          const engineB = Number(b.specifications.engine?.replace(/cc$/, '') || 0);
                          return engineB - engineA;
                        default:
                          return 0;
                      }
                    });
                    setFilteredBikes(sorted);
                  }}
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="engine-size">Engine Size</option>
                </select>
              </div>
            </div>
            
            {filteredBikes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBikes.map((bike) => (
                  <BikeCard key={bike.id} bike={bike} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="heading-sm mb-2">No bikes found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any bikes matching your search criteria.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes movePattern {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }

        .filter-option {
          @apply flex items-center cursor-pointer text-gray-300 hover:text-primary-400 transition-colors;
        }

        .filter-checkbox {
          @apply w-5 h-5 border-2 rounded flex items-center justify-center mr-2 transition-colors;
        }

        input:checked + span .filter-checkbox {
          @apply border-primary-500 bg-primary-500 text-white;
        }

        input:not(:checked) + span .filter-checkbox {
          @apply border-gray-700;
        }
      `}</style>
    </div>
  );
};

export default BikesPage;