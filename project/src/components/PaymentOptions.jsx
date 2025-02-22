import { useState } from 'react';
import toast from 'react-hot-toast';
import QRCodePayment from './QRCodePayment';

export default function PaymentOptions({ onPaymentComplete, totalAmount }) {
  const [selectedUPI, setSelectedUPI] = useState('');
  const [showQR, setShowQR] = useState(false);

  const upiOptions = [
    { id: 'gpay', name: 'Google Pay', icon: '💳', upiId: 'medicare@okaxis' },
    { id: 'phonepe', name: 'PhonePe', icon: '📱', upiId: 'medicare@ybl' },
    { id: 'paytm', name: 'Paytm', icon: '💰', upiId: 'medicare@paytm' }
  ];

  const handleUPISelect = (upiOption) => {
    setSelectedUPI(upiOption.id);
    setShowQR(true);
  };

  const handlePaymentVerification = () => {
    toast.success('Payment verified successfully!');
    onPaymentComplete();
  };

  return (
    <div className="space-y-6">
      {!showQR ? (
        <div className="space-y-4">
          {upiOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleUPISelect(option)}
              className="w-full flex items-center p-4 border rounded-lg cursor-pointer transition-colors hover:border-blue-500 hover:bg-blue-50"
            >
              <span className="mr-2">{option.icon}</span>
              <span className="flex-1 text-left">{option.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <QRCodePayment
            amount={totalAmount}
            upiId={upiOptions.find(opt => opt.id === selectedUPI)?.upiId}
            paymentApp={selectedUPI}
          />
          
          <div className="flex flex-col space-y-4">
            <button
              onClick={handlePaymentVerification}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              I have completed the payment
            </button>
            
            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Choose another payment method
            </button>
          </div>
        </div>
      )}
    </div>
  );
}