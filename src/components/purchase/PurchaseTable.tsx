"use client";

import Image from "next/image";
import Link from "next/link";

interface Purchase {
  id: string;
  vendor: string;
  product: string;
  image: string;
  quantity: number;
  price: number;
  date: string;
  status: "Completed" | "Pending" | "Cancelled";
}

const purchases: Purchase[] = [
  {
    id: "#PUR-1001",
    vendor: "TechMart",
    product: "Wireless Headphones",
    image: "/images/products/headphones.jpg",
    quantity: 2,
    price: 120,
    date: "2025-08-10",
    status: "Completed",
  },
  {
    id: "#PUR-1002",
    vendor: "StyleHub",
    product: "Men’s Casual Jacket",
    image: "/images/products/jacket.jpg",
    quantity: 1,
    price: 80,
    date: "2025-08-09",
    status: "Pending",
  },
  {
    id: "#PUR-1003",
    vendor: "GadgetZone",
    product: "Smartwatch Pro",
    image: "/images/products/smartwatch.jpg",
    quantity: 3,
    price: 150,
    date: "2025-08-08",
    status: "Cancelled",
  },
];

export default function PurchaseTable() {
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
          Recent Purchases
        </h2>
        <div>
          <Link href={"/purchase/add-purchase"}>
            <button className="rounded-lg bg-primary px-6 py-[7px] font-medium text-white hover:bg-opacity-90 dark:bg-primary dark:text-white">
              + New Purchase
            </button>
          </Link>
        </div>
      </div>

      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="px-4 py-2 font-medium">SL No</th>
            <th className="px-4 py-2 font-medium">Purchase ID</th>
            <th className="px-4 py-2 font-medium">Vendor</th>
            <th className="px-4 py-2 font-medium">Product</th>
            <th className="px-4 py-2 font-medium">Qty</th>
            <th className="px-4 py-2 font-medium">Price</th>
            <th className="px-4 py-2 font-medium">Total</th>
            <th className="px-4 py-2 font-medium">Date</th>
            <th className="px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, idx) => (
            <tr key={purchase.id} className="border-b">
              <td className="px-4 py-2 font-medium">{idx + 1}</td>
              <td className="px-4 py-2 font-medium">{purchase.id}</td>
              <td className="px-4 py-2">{purchase.vendor}</td>
              <td className="flex items-center gap-3 px-4 py-2">
                <Image
                  src={purchase.image}
                  alt={purchase.product}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                {purchase.product}
              </td>
              <td className="px-4 py-2">{purchase.quantity}</td>
              <td className="px-4 py-2">${purchase.price.toFixed(2)}</td>
              <td className="px-4 py-2">
                ${(purchase.quantity * purchase.price).toFixed(2)}
              </td>
              <td className="px-4 py-2">{purchase.date}</td>
              <td className="px-4 py-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    purchase.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : purchase.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {purchase.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-200">
          <tr>
            <td
              colSpan={4}
              className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Total Purchase:{" "}
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-blue-800 dark:bg-blue-900 dark:text-blue-400">
                {purchases.length}
              </span>
            </td>
            <td className="px-4 py-2 italic">
              {purchases.reduce((sum, p) => sum + p.quantity, 0)}
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">
              $
              {purchases
                .reduce((sum, p) => sum + p.quantity * p.price, 0)
                .toFixed(2)}
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
