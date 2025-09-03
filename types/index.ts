export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: 'jersey' | 'shoes' | 'bags' | 'others' | 'islamic';
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface Offer {
  id: string;
  name: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validFrom: string;
  validUntil: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'admin';
  timestamp: string;
}