import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { usePurchaseHistoryStore } from '../store/purchaseHistoryStore';
import { AGE_RANGES } from '../constants/ageCategories';
import { formatPrice } from '../utils/currency';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);
  const { canPurchaseProduct, getPurchaseCount, getNextPurchaseDate } = usePurchaseHistoryStore();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (product.stock <= 0) {
      toast.error('Sorry, this product is out of stock!');
      return;
    }

    const purchaseCount = getPurchaseCount(user.email, product.id);
    
    if (purchaseCount >= 5) {
      const nextDate = getNextPurchaseDate(user.email, product.id);
      toast.error(`Purchase limit reached. You can buy this product again after ${nextDate.toLocaleDateString()}`);
      return;
    }

    if (purchaseCount === 4) {
      toast.warning('This is your last allowed purchase for the next 15 days.');
    }

    addItem(product);
    toast.success(`${product.name} added to cart! (${product.stock - 1} remaining in stock)`);
  };

  const purchaseCount = user ? getPurchaseCount(user.email, product.id) : 0;
  const nextPurchaseDate = user ? getNextPurchaseDate(user.email, product.id) : null;
  const isLimitReached = purchaseCount >= 5;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="mt-1">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {AGE_RANGES[product.ageCategory]}
          </span>
        </div>
        <p className="text-gray-600 mt-2 text-sm h-12 overflow-hidden">
          {product.description}
        </p>
        <div className="mt-2 text-sm">
          <span className={`font-medium ${product.stock < 10 ? 'text-orange-600' : 'text-gray-600'}`}>
            In Stock: {product.stock} units
          </span>
        </div>
        {user && (
          <div className="mt-2">
            <div className="text-sm">
              <span className={`font-medium ${isLimitReached ? 'text-red-600' : 'text-gray-600'}`}>
                Purchases: {purchaseCount}/5
              </span>
            </div>
            {nextPurchaseDate && isLimitReached && (
              <div className="text-xs text-orange-600 mt-1">
                Next purchase available: {nextPurchaseDate.toLocaleDateString()}
              </div>
            )}
          </div>
        )}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLimitReached}
            className={`px-4 py-2 rounded ${
              product.stock > 0 && !isLimitReached
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            {product.stock === 0 
              ? 'Out of Stock' 
              : isLimitReached
                ? 'Purchase Limit Reached'
                : 'Add to Cart'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);