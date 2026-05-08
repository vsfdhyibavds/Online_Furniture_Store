import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { useCartStore } from '../stores/useCartStore';
import { useToast } from '../hooks/use-toast';
import { formatPrice } from '../lib/utils';

export function WishlistPage() {
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => apiClient.getWishlist(),
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId: string) => apiClient.removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = (item: any) => {
    // Create a product object from wishlist item
    const product = {
      id: item.productId,
      name: item.productName,
      price: item.productPrice,
      originalPrice: item.productOriginalPrice,
      images: [item.productImage],
      inStock: true,
    };

    addItem(product as any);
    toast({
      title: "Added to cart",
      description: `${item.productName} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlistMutation.mutate(productId);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const wishlistItems = wishlistData?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist and shop them later.
          </p>
          <Link to="/">
            <Button size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item: any) => (
            <Card key={item.id} className="group">
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                    disabled={removeFromWishlistMutation.isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {item.productName}
                  </h3>

                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(item.productPrice)}
                    </span>
                    {item.productOriginalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(item.productOriginalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Link to={`/product/${item.productId}`}>
                      <Button variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}