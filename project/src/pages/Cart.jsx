import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import PaymentOptions from '../components/PaymentOptions';
import { formatPrice } from '../utils/currency';
import toast from 'react-hot-toast';

export default function Cart() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const { items, removeItem, checkout } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (paymentMethod === 'cod') {
      checkout(user.email);
      toast.success('Order placed successfully!');
      navigate('/');
    }
  };

  const handlePaymentComplete = () => {
    checkout(user.email);
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.cartId} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{formatPrice(item.price)}</p>
                </div>
                <button
                  onClick={() => removeItem(item.cartId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="space-y-4">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                UPI Payment
              </label>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-xl font-bold mb-4">Total: {formatPrice(total)}</div>
            
            {paymentMethod === 'upi' ? (
              <PaymentOptions onPaymentComplete={handlePaymentComplete} totalAmount={total} />
            ) : (
              paymentMethod === 'cod' && (
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Place Order
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}