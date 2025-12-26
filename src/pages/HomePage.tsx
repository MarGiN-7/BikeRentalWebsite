import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedBikes from '../components/home/FeaturedBikes';
import CategorySection from '../components/home/CategorySection';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import { BikeCategory } from '../types';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Dehradun Bike Rentals - Ride in Style';
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedBikes />
      
      <CategorySection 
        title="Urban Commuters"
        description="Perfect for daily commutes and getting around the city. Our urban bikes are fuel-efficient, easy to handle, and comfortable for navigating Dehradun's busy streets. Whether you're a student heading to campus or a professional commuting to work, these bikes offer the perfect blend of reliability and economy."
        category={BikeCategory.URBAN}
        imageUrl="https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg"
        features={[
          "High fuel efficiency (45-55 kmpl)",
          "Comfortable seating position",
          "Ample storage space",
          "Easy maneuverability",
          "Digital instrument cluster",
          "USB charging port"
        ]}
        highlights={[
          { title: "Starting From", value: "₹250/day" },
          { title: "Monthly Plans", value: "₹3,500" },
          { title: "Mileage Range", value: "45-55 km/l" },
          { title: "Best For", value: "City Rides" }
        ]}
      />
      
      <CategorySection 
        title="Touring Bikes"
        description="Designed for those who seek adventure beyond city limits. Our touring bikes combine comfort with performance, making them perfect for weekend getaways to Mussoorie or extended trips through the Himalayas. Experience the legendary thump of Royal Enfield or the smooth power delivery of modern tourers."
        category={BikeCategory.TOURING}
        imageUrl="https://images.pexels.com/photos/2393821/pexels-photo-2393821.jpeg"
        features={[
          "Powerful engines (350cc-650cc)",
          "Comfortable touring ergonomics",
          "Large fuel capacity",
          "Dual-channel ABS",
          "Luggage mounting points",
          "Wind protection"
        ]}
        highlights={[
          { title: "Starting From", value: "₹800/day" },
          { title: "Monthly Plans", value: "₹12,000" },
          { title: "Engine Range", value: "350-650cc" },
          { title: "Best For", value: "Long Rides" }
        ]}
        isReversed={true}
      />
      
      <CategorySection 
        title="Mountain & Off-Road Bikes"
        description="Conquer any terrain with our adventure-ready motorcycles. Built specifically for the challenging roads and trails around Dehradun, these bikes feature enhanced suspension, higher ground clearance, and robust construction. Perfect for exploring Chakrata's off-road trails or tackling mountain passes."
        category={BikeCategory.MOUNTAIN}
        imageUrl="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg"
        features={[
          "Long-travel suspension",
          "High ground clearance",
          "All-terrain tires",
          "Robust crash protection",
          "Digital navigation",
          "Off-road riding modes"
        ]}
        highlights={[
          { title: "Starting From", value: "₹700/day" },
          { title: "Monthly Plans", value: "₹10,000" },
          { title: "Ground Clearance", value: "220mm" },
          { title: "Best For", value: "Adventures" }
        ]}
      />
      
      <CategorySection 
        title="Premium & Performance Bikes"
        description="Experience the thrill of high-performance motorcycles. Our premium collection features bikes from renowned manufacturers like KTM, BMW, and Kawasaki. These machines offer cutting-edge technology, superior handling, and exhilarating performance for the true enthusiast."
        category={BikeCategory.PREMIUM}
        imageUrl="https://images.pexels.com/photos/2393818/pexels-photo-2393818.jpeg"
        features={[
          "High-performance engines",
          "Premium suspension",
          "Advanced electronics",
          "Multiple riding modes",
          "Quick shifter",
          "Premium finish"
        ]}
        highlights={[
          { title: "Starting From", value: "₹800/day" },
          { title: "Monthly Plans", value: "₹12,000" },
          { title: "Power Range", value: "25-40 PS" },
          { title: "Best For", value: "Enthusiasts" }
        ]}
        isReversed={true}
      />
      
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;