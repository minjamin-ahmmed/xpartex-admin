"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type PurchaseFormInputs = {
  vendor: string;
  product: string;
  quantity: number;
  price: number;
  date: string;
  status: string;
  notes?: string;
};

const vendors = ["TechMart", "StyleHub", "GadgetZone"];
const statuses = ["Completed", "Pending", "Cancelled"];

export default function AddPurchase() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PurchaseFormInputs>({
    defaultValues: {
      quantity: 1,
      status: "Pending",
    },
  });

  const onSubmit: SubmitHandler<PurchaseFormInputs> = (data) => {
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div className="max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="mb-6 text-xl font-semibold">Add New Purchase</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Vendor */}
        <div>
          <label htmlFor="vendor" className="mb-1 block font-medium">
            Vendor
          </label>
          <select
            id="vendor"
            {...register("vendor", { required: "Vendor is required" })}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.vendor ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a vendor</option>
            {vendors.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          {errors.vendor && (
            <p className="mt-1 text-sm text-red-600">{errors.vendor.message}</p>
          )}
        </div>

        {/* Product */}
        <div>
          <label htmlFor="product" className="mb-1 block font-medium">
            Product Name
          </label>
          <input
            id="product"
            type="text"
            {...register("product", { required: "Product name is required" })}
            placeholder="Enter product name"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.product ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.product && (
            <p className="mt-1 text-sm text-red-600">
              {errors.product.message}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="mb-1 block font-medium">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.quantity ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="mb-1 block font-medium">
            Price (per unit)
          </label>
          <input
            id="price"
            type="number"
            min={0}
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price cannot be negative" },
            })}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="mb-1 block font-medium">
            Purchase Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="mb-1 block font-medium">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="mb-1 block font-medium">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={3}
            placeholder="Any extra info..."
            className="w-full resize-none rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Add Purchase
        </button>
      </form>
    </div>
  );
}
