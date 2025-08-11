"use client";

import { SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "available" | "out_of_stock" | "discontinued";
  createdAt: string;
}

const products: Product[] = [
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    stock: 120,
    status: "available",
    createdAt: "2024-07-01",
  },
  {
    id: "P002",
    name: "Running Shoes",
    category: "Footwear",
    price: 79.99,
    stock: 0,
    status: "out_of_stock",
    createdAt: "2024-06-15",
  },
  {
    id: "P003",
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 49.99,
    stock: 30,
    status: "available",
    createdAt: "2024-05-20",
  },
  {
    id: "P004",
    name: "Smart Watch",
    category: "Wearables",
    price: 199.99,
    stock: 10,
    status: "discontinued",
    createdAt: "2024-03-10",
  },
  {
    id: "P005",
    name: "Desk Lamp",
    category: "Furniture",
    price: 25.99,
    stock: 50,
    status: "available",
    createdAt: "2024-04-01",
  },
  {
    id: "P006",
    name: "Yoga Mat",
    category: "Sports",
    price: 19.99,
    stock: 100,
    status: "available",
    createdAt: "2024-07-10",
  },
  {
    id: "P007",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    stock: 0,
    status: "out_of_stock",
    createdAt: "2024-06-01",
  },
];

const ProductTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["all", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => acc + product.price, 0);
  }, [products]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
          All Products
        </h2>
        <div>
          <Link href={"/products/new-product"}>
            <button className="rounded-lg bg-primary px-6 py-[7px] font-medium text-white hover:bg-opacity-90 dark:bg-primary dark:text-white">
              + Add New Product
            </button>
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:w-64"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-48"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse overflow-x-scroll border border-gray-200 dark:border-gray-700">
        <thead className="sticky top-0 bg-gray-50 uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
              SL No
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
              Product ID
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
              Name
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
              Category
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-right dark:border-gray-700">
              Price ($)
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-right dark:border-gray-700">
              Stock Qty
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-center dark:border-gray-700">
              Status
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
              Created Date
            </th>

            <th className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product, idx) => (
            <tr
              key={product.id}
              className={`text-base font-medium text-dark transition-colors duration-300 dark:text-white ${
                idx % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <td className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                1
              </td>
              <td className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                {product.id}
              </td>
              <td className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                {product.name}
              </td>
              <td className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                {product.category}
              </td>
              <td className="border-b border-gray-200 px-4 py-3 text-right dark:border-gray-700">
                {product.price.toFixed(2)}
              </td>
              <td className="border-b border-gray-200 px-4 py-3 text-right dark:border-gray-700">
                {product.stock}
              </td>
              <td className="border-b border-gray-200 px-4 py-3 text-center capitalize dark:border-gray-700">
                <span
                  className={`inline-block rounded px-2 py-1 text-sm font-semibold ${
                    product.status === "available"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400"
                      : product.status === "out_of_stock"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400"
                  }`}
                >
                  {product.status.replace(/_/g, " ")}
                </span>
              </td>
              <td className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
              <td className="flex items-center justify-center gap-3 border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                <button className="hover:text-primary-dark text-primary transition-colors">
                  <SquarePen size={20} />
                </button>
                <button className="text-red-600 transition-colors hover:text-red-800">
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <td colSpan={8} className="px-4 py-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Total Products:{" "}
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-blue-800 dark:bg-blue-900 dark:text-blue-400">
                    {products.length}
                  </span>
                  <p className="mt-1 italic text-gray-500 dark:text-gray-400">
                    Total Price: ${totalPrice.toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs italic text-gray-500 dark:text-gray-400">
                    Last updated: {new Date().toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    className="rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                    onClick={() => alert("Export CSV")}
                  >
                    Export CSV
                  </button>

                  <button
                    className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                    onClick={() => alert("Refresh Data")}
                  >
                    Refresh Data
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;
