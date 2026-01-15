import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    price: 89.00,
    category: "Furniture",
    image: "https://picsum.photos/id/1/600/600",
    rating: 4.8,
    reviews: 124,
    description: "A sleek, modern desk lamp with adjustable brightness and color temperature. Perfect for late-night work sessions.",
    isNew: true
  },
  {
    id: 2,
    name: "Wireless Noise-Canceling Headphones",
    price: 249.00,
    category: "Audio",
    image: "https://picsum.photos/id/6/600/600",
    rating: 4.9,
    reviews: 856,
    description: "Experience pure sound with our premium noise-canceling headphones. 30-hour battery life and plush ear cushions.",
    discount: 10
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 450.00,
    category: "Furniture",
    image: "https://picsum.photos/id/20/600/600",
    rating: 4.7,
    reviews: 320,
    description: "Designed for comfort and productivity. Lumbar support, breathable mesh, and fully adjustable armrests.",
  },
  {
    id: 4,
    name: "Smart Watch Series 5",
    price: 199.00,
    category: "Electronics",
    image: "https://picsum.photos/id/26/600/600",
    rating: 4.5,
    reviews: 215,
    description: "Track your fitness, notifications, and health stats with this sleek smartwatch. Water-resistant and durable.",
    isNew: true
  },
  {
    id: 5,
    name: "Premium Leather Backpack",
    price: 129.50,
    category: "Accessories",
    image: "https://picsum.photos/id/36/600/600",
    rating: 4.6,
    reviews: 98,
    description: "Handcrafted from genuine leather. Spacious compartments for your laptop and daily essentials.",
  },
  {
    id: 6,
    name: "Bluetooth Portable Speaker",
    price: 59.99,
    category: "Audio",
    image: "https://picsum.photos/id/48/600/600",
    rating: 4.4,
    reviews: 412,
    description: "Small size, big sound. Waterproof and dustproof, making it the perfect companion for outdoor adventures.",
  },
  {
    id: 7,
    name: "Ceramic Coffee Set",
    price: 45.00,
    category: "Accessories",
    image: "https://picsum.photos/id/62/600/600",
    rating: 4.9,
    reviews: 56,
    description: "A beautiful, minimalist ceramic coffee set including 2 mugs and a pour-over dripper.",
  },
  {
    id: 8,
    name: "4K Monitor 27-inch",
    price: 350.00,
    category: "Electronics",
    image: "https://picsum.photos/id/96/600/600",
    rating: 4.7,
    reviews: 189,
    description: "Crystal clear 4K resolution with 99% sRGB color accuracy. Perfect for designers and content creators.",
    discount: 15
  }
];