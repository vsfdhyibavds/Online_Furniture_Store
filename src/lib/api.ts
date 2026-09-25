import { supabase } from './supabase';
import type { Product, Category } from '../types';

interface DbProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  images: string[];
  category_id: string;
  brand: string;
  in_stock: boolean;
  stock_quantity: number;
  rating: number;
  review_count: number;
  dimensions: { width: number; height: number; depth: number };
  weight: number | null;
  materials: string[];
  colors: string[];
  tags: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

function mapProduct(row: DbProduct, category: Category): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    images: row.images || [],
    category,
    brand: row.brand,
    inStock: row.in_stock,
    stockQuantity: row.stock_quantity,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    dimensions: row.dimensions,
    weight: row.weight ? Number(row.weight) : undefined,
    materials: row.materials || [],
    colors: row.colors || [],
    tags: row.tags || [],
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapCategory(row: DbCategory): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    image: row.image,
  };
}

async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return (data as DbCategory[]).map(mapCategory);
}

async function fetchProductsWithCategories(
  filter?: (b: ReturnType<typeof supabase.from>) => ReturnType<typeof b.select>
): Promise<{ data: Product[] }> {
  const categories = await fetchCategories();
  const categoryMap = new Map(categories.map(c => [c.id, c]));

  let query = supabase.from('products').select('*');
  if (filter) {
    query = filter(query) as typeof query;
  }

  const { data, error } = await query;
  if (error) throw error;

  const products = (data as DbProduct[]).map(row =>
    mapProduct(row, categoryMap.get(row.category_id) || {
      id: row.category_id,
      name: 'Uncategorized',
      slug: 'uncategorized',
      description: '',
      image: '',
    })
  );

  return { data: products };
}

class ApiClient {
  // Auth
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const user = this.mapAuthUser(data.user);
    return { success: true, data: { user, token: data.session?.access_token || '' } };
  }

  async register(userData: { firstName: string; lastName: string; email: string; password: string }) {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
      },
    });
    if (error) throw error;

    const user = this.mapAuthUser(data.user);
    return { success: true, data: { user, token: data.session?.access_token || '' } };
  }

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, data: null };
    return { success: true, data: this.mapAuthUser(user) };
  }

  async updateProfile(updates: Record<string, unknown>) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });
    if (error) throw error;
    return { success: true, data: this.mapAuthUser(data.user) };
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email: (await supabase.auth.getUser()).data.user?.email || '',
      password: currentPassword,
    });
    if (error) throw new Error('Current password is incorrect');

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) throw updateError;
    return { success: true, message: 'Password changed successfully' };
  }

  logout() {
    supabase.auth.signOut();
  }

  private mapAuthUser(user: any): import('../types').User {
    return {
      id: user.id,
      email: user.email || '',
      firstName: user.user_metadata?.first_name,
      lastName: user.user_metadata?.last_name,
    };
  }

  // Products
  async getProducts(params: Record<string, unknown> = {}) {
    const categories = await fetchCategories();
    const categoryMap = new Map(categories.map(c => [c.id, c]));
    const slugToId = new Map(categories.map(c => [c.slug, c.id]));

    let query = supabase.from('products').select('*');

    if (params.category && typeof params.category === 'string') {
      const catId = slugToId.get(params.category);
      if (catId) query = query.eq('category_id', catId);
    }

    if (params.featured) query = query.eq('featured', true);

    if (params.search && typeof params.search === 'string') {
      query = query.ilike('name', `%${params.search}%`);
    }

    if (params.minPrice) query = query.gte('price', params.minPrice);
    if (params.maxPrice) query = query.lte('price', params.maxPrice);

    if (params.sortBy) {
      const col = params.sortBy === 'price' ? 'price'
        : params.sortBy === 'name' ? 'name'
        : params.sortBy === 'rating' ? 'rating'
        : 'created_at';
      const ascending = params.sortOrder === 'asc';
      query = query.order(col as string, { ascending });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    if (params.limit) query = query.limit(Number(params.limit));

    const { data, error } = await query;
    if (error) throw error;

    const products = (data as DbProduct[]).map(row =>
      mapProduct(row, categoryMap.get(row.category_id) || {
        id: row.category_id,
        name: 'Uncategorized',
        slug: 'uncategorized',
        description: '',
        image: '',
      })
    );

    return { success: true, data: products, pagination: { total: products.length } };
  }

  async getProduct(id: string) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) return { success: false, data: null };

    const { data: catData } = await supabase.from('categories').select('*').eq('id', data.category_id).maybeSingle();
    const category = catData ? mapCategory(catData as DbCategory) : {
      id: data.category_id,
      name: 'Uncategorized',
      slug: 'uncategorized',
      description: '',
      image: '',
    };

    return { success: true, data: mapProduct(data as DbProduct, category) };
  }

  async getCategories() {
    const categories = await fetchCategories();
    const { data: productCounts } = await supabase
      .from('products')
      .select('category_id');

    const countMap = new Map<string, number>();
    (productCounts || []).forEach((row: any) => {
      countMap.set(row.category_id, (countMap.get(row.category_id) || 0) + 1);
    });

    const result = categories.map(c => ({
      ...c,
      productCount: countMap.get(c.id) || 0,
    }));

    return { success: true, data: result };
  }

  async getFeaturedProducts() {
    return this.getProducts({ featured: true, limit: 6 });
  }

  async getProductsByCategory(categorySlug: string, limit?: number) {
    return this.getProducts({ category: categorySlug, limit });
  }

  async searchProducts(query: string, filters: any = {}) {
    return this.getProducts({ search: query, ...filters });
  }

  // Orders
  async createOrder(orderData: {
    items: Array<{ product: Product; quantity: number; selectedColor?: string }>;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    shippingAddress: Record<string, string>;
    paymentMethod: Record<string, unknown>;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('You must be logged in to place an order');

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        status: 'processing',
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        shipping: orderData.shipping,
        total: orderData.total,
        shipping_address: orderData.shippingAddress,
        payment_method: orderData.paymentMethod,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      product_image: item.product.images[0] || '',
      product_price: item.product.price,
      quantity: item.quantity,
      price: item.product.price * item.quantity,
      selected_color: item.selectedColor || null,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
    if (itemsError) throw itemsError;

    return { success: true, data: { orderId: order.id, total: Number(order.total) } };
  }

  async getMyOrders() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: true, data: [] };

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const ordersWithItems = await Promise.all(
      (orders || []).map(async (order: any) => {
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        return {
          id: order.id,
          userId: order.user_id,
          status: order.status,
          subtotal: Number(order.subtotal),
          tax: Number(order.tax),
          shipping: Number(order.shipping),
          total: Number(order.total),
          trackingNumber: order.tracking_number,
          shippingAddress: order.shipping_address,
          paymentMethod: order.payment_method,
          createdAt: order.created_at,
          updatedAt: order.updated_at,
          items: (items || []).map((item: any) => ({
            id: item.id,
            productId: item.product_id,
            productName: item.product_name,
            productImage: item.product_image,
            productPrice: Number(item.product_price),
            quantity: item.quantity,
            price: Number(item.price),
            selectedColor: item.selected_color,
          })),
        };
      })
    );

    return { success: true, data: ordersWithItems };
  }

  async getOrder(id: string) {
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!order) return { success: false, data: null };

    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', id);

    return {
      success: true,
      data: {
        ...order,
        items: items || [],
      },
    };
  }

  // Wishlist
  async getWishlist() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: true, data: [] };

    const { data, error } = await supabase
      .from('wishlist')
      .select(`
        id,
        product_id,
        created_at,
        products!inner(id, name, price, original_price, images)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const items = (data || []).map((row: any) => ({
      id: row.id,
      productId: row.product_id,
      productName: row.products.name,
      productImage: row.products.images?.[0] || '',
      productPrice: Number(row.products.price),
      productOriginalPrice: row.products.original_price ? Number(row.products.original_price) : null,
    }));

    return { success: true, data: items };
  }

  async addToWishlist(productId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('You must be logged in');

    const { error } = await supabase
      .from('wishlist')
      .insert({ user_id: user.id, product_id: productId });

    if (error) throw error;
    return { success: true, data: { id: productId } };
  }

  async removeFromWishlist(productId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('You must be logged in');

    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) throw error;
    return { success: true, message: 'Removed from wishlist' };
  }

  async getWishlistCount() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count } = await supabase
      .from('wishlist')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    return count || 0;
  }
}

export const apiClient = new ApiClient();
