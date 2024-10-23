
// components/OrderSummary.tsx
import { Order, OrderItem } from "../components/data/order";

type OrderSummaryProps = {
  items: Order["items"];
  total: Order["total"];
  removeItem: (index: number) => void;
  submitOrder: () => void;
};

export default function OrderSummary({
  items,
  total,
  removeItem,
  submitOrder,
}: OrderSummaryProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {items.length > 0 ? (
            <>
            <table className="w-full mb-4">
                <thead>
                <tr className="border-b border-gray-300">
                    <th className="text-left p-2">Name</th>
                    <th className="text-right p-2">Price</th>
                    <th className="text-right p-2">Quantity</th>
                    <th className="text-right p-2">Subtotal</th>
                    <th className="p-2"></th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                    <td className="text-left p-2">{item.name}</td>
                    <td className="text-right p-2">${item.price.toFixed(2)}</td>
                    <td className="text-right p-2">{item.quantity}</td>
                    <td className="text-right p-2">
                        ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-2">
                        <button
                        onClick={() => removeItem(index)}
                        className="bg-red-500 text-white p-1 rounded-md"
                        >
                        X
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button
                onClick={submitOrder}
                className="bg-green-500 text-white p-2 rounded-md w-full"
            >
                Submit Order
            </button>
            </>
        ) : (
            <p className="text-center text-gray-500">No items in the order.</p>
        )}
        </div>
    )
}  