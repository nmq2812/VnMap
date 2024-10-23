import { ChangeEvent, FormEvent } from "react";
import { Order, OrderItem } from "../components/data/order";

type OrderFormProps = {
  customer: Order["customer"];
  updateCustomer: (key: string, value: string) => void;
  addItem: (item: OrderItem) => void;
};

export default function OrderForm({
  customer,
  updateCustomer,
  addItem,
}: OrderFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const item: OrderItem = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
    };
    addItem(item);
    event.currentTarget.reset();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateCustomer(name, value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-sm font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="col-span-3 bg-blue-500 text-white p-2 rounded-md"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}