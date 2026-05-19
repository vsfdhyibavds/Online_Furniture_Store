import type { Category, Product } from '../types';

type StoreProduct = Product & {
  image: string;
  stock: number;
};

type MockOrderItem = {
  id: string;
  productId: string;
  product?: StoreProduct;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  price: number;
};

type MockOrder = {
  id: string;
  userId: string;
  items: MockOrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Living Room',
    slug: 'living-room',
    description: 'Comfortable and stylish furniture for your living space',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 6,
  },
  {
    id: '2',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Create your perfect sleep sanctuary',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 4,
  },
  {
    id: '3',
    name: 'Dining Room',
    slug: 'dining-room',
    description: 'Elegant dining furniture for memorable meals',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 4,
  },
  {
    id: '4',
    name: 'Office',
    slug: 'office',
    description: 'Productive and comfortable workspace furniture',
    image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 3,
  },
  {
    id: '5',
    name: 'Storage',
    slug: 'storage',
    description: 'Organize your space with stylish storage solutions',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 3,
  },
  {
    id: '6',
    name: 'Outdoor',
    slug: 'outdoor',
    description: 'Weather-resistant furniture for your outdoor spaces',
    image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 4,
  },
];

const makeProduct = (
  id: string,
  name: string,
  category: Category,
  price: number,
  originalPrice: number | undefined,
  image: string,
  rating: number,
  reviewCount: number,
  featured = false,
  stock = 12,
): StoreProduct => ({
  id,
  name,
  description: `${name} crafted with durable materials, refined proportions, and everyday comfort for a home that feels beautifully lived in.`,
  price,
  originalPrice,
  images: [image],
  image,
  category,
  brand: 'MayBell Studio',
  inStock: stock > 0,
  stockQuantity: stock,
  stock,
  rating,
  reviewCount,
  dimensions: { width: 120, height: 80, depth: 90 },
  weight: 42,
  materials: ['Solid wood', 'Performance fabric', 'Metal hardware'],
  colors: ['Natural', 'Walnut', 'Charcoal'],
  tags: [category.slug, 'furniture', featured ? 'featured' : 'classic'],
  featured,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
});

export const products: StoreProduct[] = [
  makeProduct('1', 'Luxe Velvet Sectional Sofa', categories[0], 2899, 3499, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900', 4.8, 156, true, 12),
  makeProduct('2', 'Mid-Century Modern Coffee Table', categories[0], 649, 799, 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', 4.6, 89, true, 28),
  makeProduct('3', 'Scandinavian Accent Chair', categories[0], 449, undefined, 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 124, false, 35),
  makeProduct('4', 'Industrial TV Console', categories[0], 899, undefined, 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800', 4.5, 67, false, 18),
  makeProduct('5', 'Luxury Leather Recliner', categories[0], 1899, 2299, 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 187, true, 14),
  makeProduct('6', 'Modern Fabric Sofa', categories[0], 1299, undefined, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', 4.4, 98, false, 22),
  makeProduct('7', 'Upholstered Platform Bed', categories[1], 1299, 1599, 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 203, true, 15),
  makeProduct('8', 'Modern Nightstand Set', categories[1], 599, undefined, 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800', 4.4, 78, false, 22),
  makeProduct('9', 'Vintage Wooden Dresser', categories[1], 1199, undefined, 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 92, false, 8),
  makeProduct('10', 'Contemporary Wardrobe', categories[1], 1599, undefined, 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', 4.6, 67, false, 12),
  makeProduct('11', 'Farmhouse Dining Table Set', categories[2], 2199, 2699, 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 134, true, 6),
  makeProduct('12', 'Modern Glass Dining Table', categories[2], 1599, undefined, 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800', 4.3, 56, false, 10),
  makeProduct('13', 'Leather Dining Chairs (Set of 4)', categories[2], 899, undefined, 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800', 4.6, 89, false, 16),
  makeProduct('14', 'Extendable Dining Table', categories[2], 1299, undefined, 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800', 4.5, 73, false, 14),
  makeProduct('15', 'Executive Leather Office Chair', categories[3], 1299, undefined, 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 167, false, 25),
  makeProduct('16', 'Standing Desk Converter', categories[3], 399, undefined, 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800', 4.4, 203, false, 42),
  makeProduct('17', 'Modern Office Desk', categories[3], 799, undefined, 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800', 4.3, 94, false, 18),
  makeProduct('18', 'Modular Bookshelf System', categories[4], 799, undefined, 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', 4.5, 98, false, 20),
  makeProduct('19', 'Storage Ottoman Bench', categories[4], 299, undefined, 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800', 4.3, 76, false, 35),
  makeProduct('20', 'Industrial Storage Cabinet', categories[4], 1099, undefined, 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', 4.6, 54, false, 12),
  makeProduct('21', 'Teak Outdoor Dining Set', categories[5], 2899, 3299, 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 145, true, 8),
  makeProduct('22', 'Wicker Patio Lounge Set', categories[5], 1599, undefined, 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800', 4.4, 87, false, 12),
  makeProduct('23', 'Outdoor Sectional Sofa', categories[5], 2299, undefined, 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 112, false, 6),
  makeProduct('24', 'Garden Dining Chairs (Set of 4)', categories[5], 599, undefined, 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800', 4.2, 68, false, 20),
];

export const mockOrders: MockOrder[] = [
  {
    id: '1001',
    userId: '1',
    items: [
      {
        id: 'item-1',
        productId: products[0].id,
        product: products[0],
        productName: products[0].name,
        productImage: products[0].image,
        productPrice: products[0].price,
        quantity: 1,
        price: products[0].price,
      },
    ],
    status: 'delivered',
    subtotal: products[0].price,
    tax: 232,
    shipping: 0,
    total: 3131,
    trackingNumber: 'TRK123456789',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
  },
  {
    id: '1002',
    userId: '1',
    items: [
      {
        id: 'item-2',
        productId: products[4].id,
        product: products[4],
        productName: products[4].name,
        productImage: products[4].image,
        productPrice: products[4].price,
        quantity: 1,
        price: products[4].price,
      },
    ],
    status: 'shipped',
    subtotal: products[4].price,
    tax: 176,
    shipping: 50,
    total: 2425,
    trackingNumber: 'TRK987654321',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
  },
];

export const recentSales = [
  { id: 'sale-1', productName: 'Luxe Velvet Sectional Sofa', amount: 2899, date: '2024-01-25T10:00:00Z' },
  { id: 'sale-2', productName: 'Elegant Dining Table Set', amount: 2199, date: '2024-01-24T10:00:00Z' },
  { id: 'sale-3', productName: 'Modular Storage Cabinet', amount: 799, date: '2024-01-23T10:00:00Z' },
];

export const stockAlerts = products
  .filter(product => product.stock <= 10)
  .map(product => ({
    productId: product.id,
    productName: product.name,
    currentStock: product.stock,
  }));

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getLivingRoomProducts = () => products.filter(product => product.category.slug === 'living-room');
export const getBedroomProducts = () => products.filter(product => product.category.slug === 'bedroom');
export const getDiningRoomProducts = () => products.filter(product => product.category.slug === 'dining-room');
export const getOfficeProducts = () => products.filter(product => product.category.slug === 'office');
export const getStorageProducts = () => products.filter(product => product.category.slug === 'storage');
export const getOutdoorProducts = () => products.filter(product => product.category.slug === 'outdoor');
export const getDealsProducts = () => products.filter(product => product.originalPrice && product.originalPrice > product.price);
