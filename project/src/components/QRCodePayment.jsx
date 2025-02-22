import { QRCodeSVG } from 'qrcode.react';
import { formatPrice } from '../utils/currency';

export default function QRCodePayment({ amount, upiId, paymentApp }) {
  const getUPILink = () => {
    const baseUrl = 'upi://pay';
    const params = new URLSearchParams({
      pa: upiId,
      pn: 'MediCare',
      am: (amount / 75).toFixed(2),
      cu: 'INR',
      tn: 'Medicine Purchase'
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="text-lg font-semibold mb-2">
        Scan QR Code to Pay {formatPrice(amount)}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <QRCodeSVG
          value={getUPILink()}
          size={256}
          level="H"
          includeMargin={true}
        />
      </div>
      
      <div className="text-sm text-gray-600 mt-4">
        Open your {paymentApp === 'gpay' ? 'Google Pay' : paymentApp === 'phonepe' ? 'PhonePe' : 'Paytm'} app and scan this QR code
      </div>
    </div>
  );
}