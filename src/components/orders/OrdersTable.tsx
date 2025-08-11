"use client";

import Image from "next/image";
import { CheckCircle, Clock, XCircle, Truck, Package } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  customer: string;
  itemsCount: number;
  total: number;
  date: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  shippingStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

const orders: Order[] = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    itemsCount: 3,
    total: 150.0,
    date: "2025-08-10",
    paymentStatus: "Paid",
    shippingStatus: "Delivered",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    itemsCount: 1,
    total: 50.0,
    date: "2025-08-09",
    paymentStatus: "Pending",
    shippingStatus: "Processing",
  },
  {
    id: "#ORD-003",
    customer: "Ali Hassan",
    itemsCount: 5,
    total: 250.0,
    date: "2025-08-08",
    paymentStatus: "Failed",
    shippingStatus: "Cancelled",
  },
];

export default function OrdersTable() {
  const renderPaymentStatus = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "Paid":
        return (
          <span className="flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
            <CheckCircle size={16} />
            Paid
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center gap-1 font-medium text-yellow-600 dark:text-yellow-400">
            <Clock size={16} />
            Pending
          </span>
        );
      case "Failed":
        return (
          <span className="flex items-center gap-1 font-medium text-red-600 dark:text-red-400">
            <XCircle size={16} />
            Failed
          </span>
        );
    }
  };

  const renderShippingStatus = (status: Order["shippingStatus"]) => {
    switch (status) {
      case "Processing":
        return (
          <span className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
            <Package size={16} />
            Processing
          </span>
        );
      case "Shipped":
        return (
          <span className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400">
            <Truck size={16} />
            Shipped
          </span>
        );
      case "Delivered":
        return (
          <span className="flex items-center gap-1 font-medium text-green-700 dark:text-green-500">
            <CheckCircle size={16} />
            Delivered
          </span>
        );
      case "Cancelled":
        return (
          <span className="flex items-center gap-1 font-medium text-red-700 dark:text-red-500">
            <XCircle size={16} />
            Cancelled
          </span>
        );
    }
  };

  // Calculate total price sum
  const totalOrderPrice = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="overflow-x-auto rounded-xl bg-white p-4 shadow dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
          Orders
        </h2>
        <div>
          <Link href={"/orders/add-new-order"}>
            <button className="rounded-lg bg-primary px-6 py-[7px] font-medium text-white hover:bg-opacity-90 dark:bg-primary dark:text-white">
              + Add New Order
            </button>
          </Link>
        </div>
      </div>

      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="px-4 py-2 font-medium">SL No</th>
            <th className="px-4 py-2 font-medium">Order ID</th>
            <th className="px-4 py-2 font-medium">Customer</th>
            <th className="px-4 py-2 font-medium">Items</th>
            <th className="px-4 py-2 font-medium">Total</th>
            <th className="px-4 py-2 font-medium">Order Date</th>
            <th className="px-4 py-2 font-medium">Payment Status</th>
            <th className="px-4 py-2 font-medium">Shipping Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b transition hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-3 font-medium">{order.id}</td>
              <td className="px-4 py-3">{order.customer}</td>
              <td className="px-4 py-3">{order.itemsCount}</td>
              <td className="px-4 py-3">${order.total.toFixed(2)}</td>
              <td className="px-4 py-3">{order.date}</td>
              <td className="px-4 py-3">
                {renderPaymentStatus(order.paymentStatus)}
              </td>
              <td className="px-4 py-3">
                {renderShippingStatus(order.shippingStatus)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100 font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <td className="flex items-center gap-2 px-4 py-2" colSpan={3}>
              Total Orders:{" "}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                {orders.length}
              </span>
            </td>
            <td className="px-4 py-2">
              {orders.reduce((acc, o) => acc + o.itemsCount, 0)}
            </td>
            <td className="px-4 py-2">${totalOrderPrice.toFixed(2)}</td>
            <td className="px-4 py-2" colSpan={5}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
