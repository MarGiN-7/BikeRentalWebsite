export interface Bike {
  id: string;
  name: string;
  type: string;
  category: BikeCategory;
  imageUrl: string;
  dailyRate: number;
  monthlyRate: number;
  unlimitedRate: number;
  description: string;
  features: string[];
  specifications: {
    engine?: string;
    power?: string;
    mileage?: string;
    topSpeed?: string;
    weight?: string;
    seatHeight?: string;
    fuelCapacity?: string;
    groundClearance?: string;
  };
  availability: boolean;
  tax?: number;
}

export enum BikeCategory {
  URBAN = 'Urban Commuters',
  TOURING = 'Touring Bikes',
  MOUNTAIN = 'Mountain & Off-Road Bikes',
  PREMIUM = 'Premium & Performance Bikes',
}

export interface Review {
  id: string;
  user_id: string;
  bike_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_name: string;
  user_avatar?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  bookings?: Booking[];
}

export interface Booking {
  id: string;
  userId: string;
  bikeId: string;
  startDate: Date;
  endDate: Date;
  plan: 'daily' | 'monthly' | 'unlimited';
  totalAmount: number;
  tax: number;
  finalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}