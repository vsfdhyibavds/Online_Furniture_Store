const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth-token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth-token', token);
    } else {
      localStorage.removeItem('auth-token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<{
      success: boolean;
      data: { user: any; token: string };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const response = await this.request<{
      success: boolean;
      data: { user: any; token: string };
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<{
      success: boolean;
      data: any;
    }>('/auth/me');
  }

  async updateProfile(updates: Record<string, unknown>) {
    return this.request<{
      success: boolean;
      data: unknown;
    }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>('/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Product endpoints
  async getProducts(params: Record<string, unknown> = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });

    return this.request<{
      success: boolean;
      data: unknown[];
      pagination: unknown;
    }>(`/products?${searchParams}`);
  }

  async getProduct(id: string) {
    return this.request<{
      success: boolean;
      data: unknown;
    }>(`/products/${id}`);
  }

  async getCategories() {
    return this.request<{
      success: boolean;
      data: unknown[];
    }>('/products/categories/all');
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

  // Order endpoints
  async createOrder(orderData: Record<string, unknown>) {
    return this.request<{
      success: boolean;
      data: { orderId: string; total: number };
    }>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getMyOrders() {
    return this.request<{
      success: boolean;
      data: unknown[];
    }>('/orders/my-orders');
  }

  async getOrder(id: string) {
    return this.request<{
      success: boolean;
      data: unknown;
    }>(`/orders/${id}`);
  }

  // User endpoints
  async getAddresses() {
    return this.request<{
      success: boolean;
      data: unknown[];
    }>('/users/addresses');
  }

  async addAddress(address: Record<string, unknown>) {
    return this.request<{
      success: boolean;
      data: { id: string };
    }>('/users/addresses', {

      body: JSON.stringify(address),
    });
  }
  async updateAddress(id: string, updates: Record<string, unknown>) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/users/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteAddress(id: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/users/addresses/${id}`, {
      method: 'DELETE',
    });
  }

  async getWishlist() {
    return this.request<{
      success: boolean;
      data: unknown[];
    }>('/users/wishlist');
  }

  async addToWishlist(productId: string) {
    return this.request<{
      success: boolean;
      data: { id: string };
    }>('/users/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  }

  async removeFromWishlist(productId: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/users/wishlist/${productId}`, {
      method: 'DELETE',
    });
  }

  // Payment endpoints
  async processPayment(paymentData: Record<string, unknown>) {
    return this.request<{
      success: boolean;
      data: unknown;
    }>('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Upload endpoints
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.request<{
      success: boolean;
      data: { url: string; filename: string };
    }>('/upload/image', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });
  }

  logout() {
    this.setToken(null);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);