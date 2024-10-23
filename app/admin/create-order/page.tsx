"use client"
// pages/order.tsx
import { useState } from "react";
import { Order, OrderItem } from "../components/data/order";
import OrderForm from "../components/order-form";
import OrderSummary from "../components/order-summary";

export default function OrderPage() {
  const [order, setOrder] = useState<Order>({
    customer: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    items: [],
    total: 0,
  });

  const addItem = (item: OrderItem) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: [...prevOrder.items, item],
      total: prevOrder.total + item.price * item.quantity,
    }));
  };

  const removeItem = (index: number) => {
    setOrder((prevOrder) => {
      const newItems = [...prevOrder.items];
      const removedItem = newItems.splice(index, 1)[0];
      return {
        ...prevOrder,
        items: newItems,
        total: prevOrder.total - removedItem.price * removedItem.quantity,
      };
    });
  };

  const updateCustomer = (key: string, value: string) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      customer: {
        ...prevOrder.customer,
        [key]: value,
      },
    }));
  };

  const submitOrder = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      if (data.success) {
        alert("Order submitted successfully!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="grid place-items-center h-full">
      <div className="mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Create Order</h1>
        <div className="grid grid-cols-2 gap-8">
          <OrderForm
            customer={order.customer}
            updateCustomer={updateCustomer}
            addItem={addItem}
          />
          <OrderSummary
            items={order.items}
            total={order.total}
            removeItem={removeItem}
            submitOrder={submitOrder}
          />
        </div>
      </div>
    </div>
  );
}
