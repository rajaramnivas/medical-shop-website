import { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';

export default function ProductUpdateBanner() {
  const [visible, setVisible] = useState(false);
  const lastUpdate = useProductStore((state) => state.lastUpdate);

  useEffect(() => {
    if (lastUpdate) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [lastUpdate]);

  if (!visible || !lastUpdate) return null;

  return (
    <div className="bg-blue-50 border-t border-b border-blue-100 px-4 py-3">
      <div className="flex justify-between max-w-7xl mx-auto">
        <p className="text-sm text-blue-700">
          Product inventory was updated {new Date(lastUpdate).toLocaleString()}
        </p>
        <button
          onClick={() => setVisible(false)}
          className="text-blue-700 hover:text-blue-900"
        >
          ×
        </button>
      </div>
    </div>
  );
}