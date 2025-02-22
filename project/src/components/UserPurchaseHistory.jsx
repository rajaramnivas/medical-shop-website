import { usePurchaseHistoryStore } from '../store/purchaseHistoryStore';
import { useProductStore } from '../store/productStore';
import { useAuthStore } from '../store/authStore';
import { formatPrice } from '../utils/currency';
import { formatDate } from '../utils/date';

export default function UserPurchaseHistory() {
  const { purchases } = usePurchaseHistoryStore();
  const { products } = useProductStore();
  const { users } = useAuthStore();

  // Group purchases by user
  const purchasesByUser = purchases.reduce((acc, purchase) => {
    const user = users.find(u => u.email === purchase.userId);
    if (!user) return acc;

    if (!acc[purchase.userId]) {
      acc[purchase.userId] = {
        user,
        purchases: []
      };
    }

    const product = products.find(p => p.id === purchase.productId);
    if (product) {
      acc[purchase.userId].purchases.push({
        ...purchase,
        product
      });
    }

    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">User Purchase History</h3>
      
      {Object.entries(purchasesByUser).length === 0 ? (
        <p className="text-gray-500">No purchases found</p>
      ) : (
        Object.entries(purchasesByUser).map(([userId, data]) => (
          <div key={userId} className="bg-white rounded-lg shadow p-6">
            <div className="border-b pb-4 mb-4">
              <h4 className="font-semibold text-lg">{data.user.name}</h4>
              <p className="text-gray-600">{data.user.email}</p>
              <p className="text-gray-600">Mobile: {data.user.mobile}</p>
            </div>
            
            <div className="space-y-4">
              {data.purchases
                .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
                .map((purchase, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={purchase.product.image}
                      alt={purchase.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium">{purchase.product.name}</h5>
                      <p className="text-gray-600">{formatPrice(purchase.product.price)}</p>
                      <p className="text-sm text-gray-500">
                        Purchased on: {formatDate(purchase.purchaseDate)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}