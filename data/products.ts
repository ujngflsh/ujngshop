import { Product, Category } from '../types';

export const categories: { name: Category; image: string }[] = [
  { name: 'Tunik & Blouse', image: '/images/cat-tunik.jpg' },
  { name: 'Dress', image: '/images/cat-dress.jpg' },
  { name: 'Celana & Rok', image: '/images/cat-celana.jpg' },
  { name: 'Outer & Cardigan', image: '/images/cat-outer.jpg' },
  { name: 'Batik Modern', image: '/images/cat-batik.jpg' },
];

const sizes = ['S', 'M', 'L', 'XL'];
const colors = [
  { name: 'Dusty Rose', hex: '#C58D98' },
  { name: 'Ivory', hex: '#F1E7D6' },
  { name: 'Cokelat', hex: '#735344' },
  { name: 'Maroon', hex: '#7E2349' },
];

export const products: Product[] = [
  { id: 1, name: 'Tunik Linen Premium', price: 249000, category: 'Tunik & Blouse', image: '/images/p1.jpg', rating: 4.8, reviews: 120, isNew: true, sizes, colors,
    description: 'Tunik berbahan linen premium yang adem dan jatuh. Potongan longgar nyaman untuk aktivitas harian maupun acara santai.' },
  { id: 2, name: 'Dress Floral Aline', price: 329000, category: 'Dress', image: '/images/p2.jpg', rating: 4.7, reviews: 98, discount: 15, sizes, colors,
    description: 'Dress A-line motif floral lembut dengan siluet anggun. Bahan ringan, tidak menerawang, dan mudah dipadukan dengan hijab pilihanmu.' },
  { id: 3, name: 'Outer Batik Nusantara', price: 289000, category: 'Batik Modern', image: '/images/p3.jpg', rating: 4.9, reviews: 76, isNew: true, sizes, colors,
    description: 'Outer batik dengan motif khas Nusantara dalam potongan modern. Cocok untuk tampilan formal maupun kasual.' },
  { id: 4, name: 'Blouse Daily', price: 199000, category: 'Tunik & Blouse', image: '/images/p4.jpg', rating: 4.6, reviews: 64, sizes, colors,
    description: 'Blouse harian dengan bahan lembut dan sejuk. Basic item yang wajib ada di lemari.' },
  { id: 5, name: 'Celana Kulot Premium', price: 229000, category: 'Celana & Rok', image: '/images/p5.jpg', rating: 4.7, reviews: 88, sizes, colors,
    description: 'Celana kulot lebar dengan pinggang karet nyaman. Jatuh cantik dan tidak mudah kusut.' },
  { id: 6, name: 'Cardigan Rajut Lembut', price: 269000, category: 'Outer & Cardigan', image: '/images/cat-outer.jpg', rating: 4.5, reviews: 52, discount: 20, sizes, colors,
    description: 'Cardigan rajut tebal-tipis yang hangat tanpa membuat gerah. Pas dipakai berlapis.' },
  { id: 7, name: 'Kemeja Batik Modern', price: 259000, category: 'Batik Modern', image: '/images/cat-batik.jpg', rating: 4.8, reviews: 110, sizes, colors,
    description: 'Kemeja batik dengan motif kontemporer dan jahitan rapi. Tampil berbudaya, tetap kekinian.' },
  { id: 8, name: 'Rok Plisket Elegan', price: 189000, category: 'Celana & Rok', image: '/images/cat-celana.jpg', rating: 4.4, reviews: 41, sizes, colors,
    description: 'Rok plisket panjang dengan lipatan rapi dan karet pinggang belakang. Mudah dipadu padan.' },
  { id: 9, name: 'Tunik Bordir Anggun', price: 279000, category: 'Tunik & Blouse', image: '/images/cat-tunik.jpg', rating: 4.9, reviews: 93, isNew: true, discount: 10, sizes, colors,
    description: 'Tunik dengan detail bordir halus di bagian dada dan lengan. Mewah namun tetap sederhana.' },
  { id: 10, name: 'Dress Satin Pesta', price: 399000, category: 'Dress', image: '/images/cat-dress.jpg', rating: 4.6, reviews: 37, discount: 25, sizes, colors,
    description: 'Dress satin dengan kilau lembut untuk acara spesial. Jatuh mengalir dan nyaman dipakai seharian.' },
];
