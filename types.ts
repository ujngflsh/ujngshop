export type Category = 'Tunik & Blouse' | 'Dress' | 'Celana & Rok' | 'Outer & Cardigan' | 'Batik Modern';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  discount?: number; // persen
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
  color: string;
  key: string; // id-size-color
}
